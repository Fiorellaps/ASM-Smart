import pandas as pd

from common_functions.elasticsearch_utiles import connect_to_elastic, run_elastic_query

def get_test_list():
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
    print("data_df", data_df.columns)
    print("data_df", data_df.iloc[1])
    
    selected_indices = data_df.sample(n=60).index
    data_df.loc[selected_indices, 'entorno'] = 'Web'

    data_df_by_entorno = [{"name": entorno, "data": grupo.drop('entorno', axis=1).to_dict('records')} for entorno, grupo in data_df.groupby('entorno')]
    
    return data_df_by_entorno