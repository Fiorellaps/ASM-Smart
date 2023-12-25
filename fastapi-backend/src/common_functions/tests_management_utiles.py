import pandas as pd
from datetime import date, datetime, timedelta

from common_functions.elasticsearch_utiles import connect_to_elastic, run_elastic_query

def get_test_list():

    # Calcular fecha inicio y fecha fin
    datetime_ini = datetime.now() - timedelta(hours=1)
    datetime_ini = str(datetime_ini) 
    datetime_ini = datetime.strptime(datetime_ini, "%Y-%m-%d %H:%M:%S.%f")
    datetime_ini_str = datetime_ini.strftime("%Y-%m-%dT%H:%M:%S")

    datetime_fi = datetime.now() + timedelta(hours=1)
    datetime_fi = str(datetime_fi)
    datetime_fi = datetime.strptime(datetime_fi,"%Y-%m-%d %H:%M:%S.%f")
    datetime_fi_str = datetime_fi.strftime("%Y-%m-%dT%H:%M:%S")

    query = {
        "query":{
            "bool": {
                "must": [
                {
                    "range": {
                    "fechaCalculo": {
                        "gte": datetime_ini_str,
                        "lte": datetime_fi_str 
                    }
                    }
                }
                ]
            }
        },
        "sort" : [
            {"fechaUltimaEjecucion":"desc"},
            {"nombreTest.keyword": "desc"}
        ]
    }
    index_name = "aggregations-asm"
    es = connect_to_elastic()
    
    data = run_elastic_query(es, query, index_name)
    data_df = pd.DataFrame(data)
    '''
    columns_to_drop = ['calculoHora','calculoDia','calculoMes','totalCorrectoHora',
                       'totalCorrectoDia','totalCorrectoMes','totalErrorHora','totalErrorDia',
                       'totalErrorMes','totalHora','totalDia','totalMes' ]
    data_df = data_df.drop(columns=columns_to_drop)
    
    data_df = data_df.dropna(subset=['porcentajeCorrecto'])
    '''

    ## TO REMOVE, just for testing

    selected_indices = data_df.sample(n=60).index
    data_df.loc[selected_indices, 'entorno'] = 'Web'

    data_df_by_entorno = [{"name": entorno, "data": grupo.drop('entorno', axis=1).to_dict('records')} for entorno, grupo in data_df.groupby('entorno')]
    return data_df_by_entorno