from datetime import date, datetime, timedelta
import pandas as pd
import re
import time


from common_functions.elasticsearch_utiles import connect_to_elastic, run_elastic_query
index_name="raw-asm"


def split_camelcase_string(s):
    return re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', s)

def process_main_dashboard_data(datetime_ini, datetime_fi):
    ## Convert to Date
    #format = "%Y-%m-%d %H:%M:%S"

    # convert to date
    #datetime_ini = datetime.fromisoformat(init_date)
    #datetime_ini
    print("datetime_ini:", datetime_ini)

    #datetime_fi = datetime.fromisoformat(end_date)
    print("datetime_fi:", datetime_fi)

    ## Get previous interval
    start_time = time.time()
    interval_days = (datetime_fi - datetime_ini).days
    previous_datetime_ini =  datetime_ini - timedelta(days=interval_days)
    previous_datetime_fi = datetime_fi - timedelta(days=interval_days)

    ## Cretae connection to Elastic
    es = connect_to_elastic()

    ## Get actual data

    query = {
        "query": {
            "bool": {
                "filter": [
                    {
                        "range": {
                            "fechaProcesado": {
                                "gte": datetime_ini,
                                "lte": datetime_fi,
                            }
                        }
                    }
                ]
            }
        }
    }

    actual_data = run_elastic_query(es, query, index_name)
    actual_data_df = pd.DataFrame(actual_data)

    ## Get previous period data
    query = {
        "query": {
            "bool": {
                "filter": [
                    {
                        "range": {
                            "fechaProcesado": {
                                "gte": previous_datetime_ini,
                                "lte": previous_datetime_fi,
                            }
                        }
                    }
                ]
            }
        }
    }

    previous_data = run_elastic_query(es, query, index_name)
    previous_data_df = pd.DataFrame(previous_data)


    ## Process data to add tags and enviroment

    actual_data_df['tags'] = actual_data_df.apply(lambda x: split_camelcase_string(x['nombreTest']) + split_camelcase_string(x['nombreRobot']), axis=1)
    actual_data_df['entorno'] = actual_data_df['nombreRobot'].apply(lambda x: split_camelcase_string(x))[1][1]

    previous_data_df['tags'] = previous_data_df.apply(lambda x: split_camelcase_string(x['nombreTest']) + split_camelcase_string(x['nombreRobot']), axis=1)
    previous_data_df['entorno'] = previous_data_df['nombreRobot'].apply(lambda x: split_camelcase_string(x))[1][1]

    ## Set the final result variable

    dashboard_result = {}

    ## Graph One: Total number of tours and total number of errors in actual and previous period

    # calcular número total de ejecuciones y la comparación en el periodo previo
    total_actual_tours = len(actual_data_df)
    total_previous_tours = len(previous_data_df)
    print("total_actual_tours", total_actual_tours)
    print("total_previous_tours", total_previous_tours)

    # calcular número total de errores y la comparación en el periodo previo
    filtered_actual_data_df = actual_data_df[actual_data_df['errorMsg'].notnull() & (actual_data_df['errorMsg'] != '')]
    total_actual_errors = len(filtered_actual_data_df)

    filtered_previous_data_df = previous_data_df[previous_data_df['errorMsg'].notnull() & (previous_data_df['errorMsg'] != '')]
    total_previous_errors = len(filtered_previous_data_df)
    print("total_actual_errors", total_actual_errors)
    print("total_previous_errors", total_previous_errors)

    # Assign to dashboard_result
    dashboard_result['total_actual_tours'] = total_actual_tours
    dashboard_result['total_previous_tours'] = total_previous_tours
    dashboard_result['total_actual_errors'] = total_actual_errors
    dashboard_result['total_previous_errors'] = total_previous_errors

    ## Graph Two: Diagrama de barras de los 5 tours con más errores por paso

    top_5_tours_df = filtered_actual_data_df.groupby(['nombreTest']).size().reset_index(name='Count').sort_values(by='Count', ascending=False)
    top_5_tours_list = top_5_tours_df.head(5)['nombreTest'].tolist()
    filtered_actual_top_5_df = filtered_actual_data_df[filtered_actual_data_df['nombreTest'].isin(top_5_tours_list)]

    grouped_actual_top_5_df = filtered_actual_top_5_df.groupby(['nombreTest', 'idPaso']).size().reset_index(name='Count').sort_values(by='idPaso', ascending=True)

    min_step = int(grouped_actual_top_5_df['idPaso'].unique().min())
    max_step = int(grouped_actual_top_5_df['idPaso'].unique().max())
    bar_tours_list = grouped_actual_top_5_df['nombreTest'].unique().tolist()
    bar_plot_list = []

    for i in range (min_step, max_step+ 1, 1):
        i = str(i)
        result_array = []
        for test in bar_tours_list:
            if any((grouped_actual_top_5_df['nombreTest'] == test) & (grouped_actual_top_5_df['idPaso'] == i)):
                result_array.append(grouped_actual_top_5_df.loc[(grouped_actual_top_5_df['nombreTest'] == test) & (grouped_actual_top_5_df['idPaso'] == i), 'Count'].values[0])
            else:
                result_array.append(0)
        dict = {'name': f'Paso {i}', 'data':result_array }
        bar_plot_list.append(dict)
    
    # Assign to dashboard_result
    dashboard_result['bar_tours_list'] = bar_tours_list
    dashboard_result['bar_plot_list'] = bar_plot_list

    ## Graph Three: Diagrama de barras con los mensajes de error más comunes

    top_5_errormsg_df = filtered_actual_data_df.groupby(['errorMsg']).size().reset_index(name='Count').sort_values(by='Count', ascending=False)
    top_5_errormsg_list = top_5_errormsg_df.head(5)['errorMsg'].tolist()
    top_5_count_list = [{'name':'Errores', 'data': top_5_errormsg_df.head(5)['Count'].tolist()}]
    
    # Assign to dashboard_result
    dashboard_result['top_5_errormsg_list'] = top_5_errormsg_list
    dashboard_result['top_5_count_list'] = top_5_count_list

    ## Graph Four: Series temporales de la evolución de los errores sobre el top 5 de tours

    filtered_actual_data_df['fechaProcesado']= pd.to_datetime(filtered_actual_data_df['fechaProcesado'])

    if interval_days < 3:
        filtered_actual_data_df['fecha_nueva'] = filtered_actual_data_df['fechaProcesado'].dt.strftime('%d-%m-%Y %H')
    elif interval_days < 31:
        filtered_actual_data_df['fecha_nueva'] = filtered_actual_data_df['fechaProcesado'].dt.strftime('%d-%m-%Y')
    elif interval_days < 372:
        filtered_actual_data_df['fecha_nueva'] = filtered_actual_data_df['fechaProcesado'].dt.strftime('%m-%Y')
    else:
        filtered_actual_data_df['fecha_nueva'] = filtered_actual_data_df['fechaProcesado'].dt.strftime('%Y')
        
    grouped_dates_top_5_df = filtered_actual_data_df.groupby(['nombreTest', 'fecha_nueva']).size().reset_index(name='Count').sort_values(by='fecha_nueva', ascending=True)

    grouped_dates_top_5_df = grouped_dates_top_5_df[grouped_dates_top_5_df['nombreTest'].isin(top_5_tours_list)]
    line_dates_list = grouped_dates_top_5_df['fecha_nueva'].unique().tolist()

    line_plot_list = []
    for tour in top_5_tours_list:
        result_array = []
        for date in line_dates_list:
            check_df = (grouped_dates_top_5_df['fecha_nueva'] == date) & (grouped_dates_top_5_df['nombreTest'] == tour)
            if any(check_df):
                result_array.append(grouped_dates_top_5_df.loc[check_df, 'Count'].values[0])
            else:
                result_array.append(0)
        dict = {'name': tour, 'data':result_array }
        line_plot_list.append(dict)
    
    # Assign to dashboard_result
    dashboard_result['line_dates_list'] = line_dates_list
    dashboard_result['line_plot_list'] = line_plot_list

    ## Graph Five: Tags más comúmes sobre los tours con errores
    tags_df = filtered_actual_data_df.explode('tags').groupby(['tags']).size().reset_index(name='Count').sort_values(by='Count', ascending=False)
    top_8_tags_df  = tags_df.head(8)
    top_8_tags_list = top_8_tags_df['tags'].tolist()
    top_8_tags_count_list = top_8_tags_df['Count'].tolist()
    
     # Assign to dashboard_result
    dashboard_result['top_8_tags_list'] = top_8_tags_list
    dashboard_result['top_8_tags_count_list'] = top_8_tags_count_list
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("END",str(elapsed_time))
    return dashboard_result


    


