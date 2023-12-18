from datetime import date, datetime, timedelta
import pandas as pd
import re
import time


from common_functions.elasticsearch_utiles import connect_to_elastic, run_elastic_query

def split_camelcase_string(s):
    return re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', s)

def process_main_dashboard_data():

    ## Cretae connection to Elastic
    es = connect_to_elastic()
    start_time = time.time()

    ## Get actual data

    query = {
    "query": {
        "query_string": {
        "query": "*"
        }
    },
    "sort" : [
        {"fechaUltimaEjecucion":"desc"},
        {"nombreTest.keyword": "desc"}
    ]
    }
    index_name = "aggregations-asm"
    data = run_elastic_query(es, query, index_name)
    data_df = pd.DataFrame(data)

    dashboard_result = {}

    # GRAFICA 1: Donut Chart
    data_df['totalCorrecto'] = data_df['totalCorrecto'].astype(float)
    total_correcto = sum(data_df['totalCorrecto'])
    total_error = sum(data_df['totalError'])
    total_correcto =  float(str(total_correcto).replace('nan', '0'))
    total_error =  float(str(total_error).replace('nan', '0'))

    dashboard_result['total_errors_names'] = ['Sin error', 'Con error']
    dashboard_result['total_errors_list'] = [total_correcto, total_error]

    # GRAFICA 2: Diagrama de barras horizontal del número de errores por entorno
    data_df_grouped_entorno = data_df.groupby('entorno').agg({"totalError":"sum", "totalCorrecto":"sum"}).reset_index().sort_values(by='totalError', ascending=False)
    top3_entornos_names_list = data_df_grouped_entorno['entorno'][0:3].tolist()

    top3_entornos_values_list = [{"data": data_df_grouped_entorno['totalError'][0:3].tolist()}]
    dashboard_result['bar_enviroments_list'] = top3_entornos_names_list
    dashboard_result['bar_enviroments_values_list'] = top3_entornos_values_list

    # GRAFICA 3: Stat del total de tests con erroes
    total_error_stat = total_error
    dashboard_result['total_number_errors_stat'] = total_error_stat

    # GRAFICA 4: Stat del total de tests inactivos
    total_inactive_stat = len(data_df[data_df['activo']  == False])
    dashboard_result['total_number_inactive_stat'] = total_inactive_stat

    # GRAFICAS 5: Donut chart de estados por entorno
    grouped_entorno_chart_data = data_df_grouped_entorno.apply(lambda row: {row['entorno']:{'Sin error': row['totalCorrecto'], 'Con error': row['totalError']}}, axis=1).tolist()
    dashboard_result['by_enviroment_donut_chart_data'] = grouped_entorno_chart_data

    # GRAFICAS 6: Donut chart de estados por tags
    data_df_grouped_tag = data_df.explode('tags').groupby(['tags']).agg({"totalError":"sum", "totalCorrecto":"sum"}).reset_index().sort_values(by='totalError', ascending=False)
    data_df_grouped_tag = data_df_grouped_tag.head(8)

    grouped_tag_chart_data = data_df_grouped_tag.apply(lambda row: {row['tags']:{'Sin error': row['totalCorrecto'], 'Con error': row['totalError']}}, axis=1).tolist()
    dashboard_result['by_tag_donut_chart_data'] = grouped_tag_chart_data

    # GRAFICA 7: Diagrama de barras horizontal del número de errores por robot
    data_df_grouped_robot = data_df.groupby('nombreRobot').agg({"totalError":"sum", "totalCorrecto":"sum"}).reset_index().sort_values(by='totalError', ascending=False)
    data_df_grouped_robot = data_df_grouped_robot.head(5)
    top3_robot_names_list = data_df_grouped_robot['nombreRobot'].tolist()

    top3_robot_values_list = [{"data": data_df_grouped_robot['totalError'].tolist()}]
    dashboard_result['bar_robots_list'] = top3_robot_names_list
    dashboard_result['bar_robots_values_list'] = top3_robot_values_list

    # GRAFICA 8: Donut chart número de errores por robot
    grouped_robot_chart_data = data_df_grouped_robot.apply(lambda row: {row['nombreRobot']:{'Sin error': row['totalCorrecto'], 'Con error': row['totalError']}}, axis=1).tolist()
    dashboard_result['by_robot_donut_chart_data'] = grouped_robot_chart_data
   
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("END process_main_dashboard_data",str(elapsed_time))
    return dashboard_result


    


