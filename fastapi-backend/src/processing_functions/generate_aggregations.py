import json
import pandas as pd
from datetime import datetime
import dateutil.relativedelta
import sys
import logging
import warnings
import sched
import time
import re

from elasticsearch import Elasticsearch
from elasticsearch.helpers import scan
from elasticsearch.helpers import bulk
from elasticsearch.helpers import BulkIndexError

# Suppress the specific warning related to the InsecureRequestWarning
warnings.filterwarnings("ignore")
logging.getLogger("elasticsearch").setLevel(logging.WARNING)

'''
Función que genera un dataFrame a partir de loa registros almacenados en elastic para cada test entre las fecha actual y el periodo anterior.
Este json debe tener el formato tal cual lo genera una query a elastic, es decir, con los camos obligatorios hits.hits.
Pasos:
    - Cargar fichero
    - Comprobar que existe el campo hits.hits
    - Recorrer el array hits.hits
    - Filtrar los registros que no sean de tipo HAR
    - Almacenar en un diccionario el tipo de registro y el resto de campos del resultado
    - Transformar la fecha al formato por defecto "%Y-%m-%d %H:%M:%S"
    - Convertir a dataFrame
'''

def connect_to_elastic():
    elastic_url = 'https://10.210.4.118:9200'
    elastic_user = 'elastic'
    elastic_password = 'eilv2Dh04gbCBYAouc1o'

    es = Elasticsearch(
        elastic_url,
        #ca_certs= elastic_crt,
        basic_auth=(elastic_user, elastic_password),
        timeout=300,
        verify_certs=False
    )
    return es

def run_elastic_query(elastic_connection, query, index_name, page_size=10000, scroll="6m"):
    # Disable Elasticsearch scroll logs
    logging.getLogger("elasticsearch").setLevel(logging.WARNING)

    
    page_size = page_size
    scroll_id = None

    response = scan(
            elastic_connection,
            query=query,
            index=index_name,
            scroll=scroll,
            size=page_size
    )

    results = []
    for hit in response:
        results.append(hit["_source"])

    return results

def check_required_files (dictionary:dict):
    required_files = ["tipo", "fecha"]
    if all(key in dictionary for key in dictionary):
        return True
    else:
        return False
    
def get_unique_idTest_from_elastic(es, index_name):
    aggs = {
    "unique_idTest": {
      "terms": {
        "field": "idTest.keyword",
        "size": 100000 
          }
        }
     }
    result = es.search(index=index_name, size = 0, aggs=aggs)
    print("numero de ids", len(result["aggregations"]["unique_idTest"]['buckets']))
    return result

def compute_aggregation(test_results, previuos_date, current_date):
    filtered_by_date = test_results[(test_results['fecha'] <= current_date) & (test_results['fecha'] >= previuos_date)]
        
    total_success_filtered_by_date = len(filtered_by_date[filtered_by_date['idError'] == 1])
    #total_success_filtered_by_date = len(filtered_by_date[filtered_by_date['errorMsg'] == ""])

    total_number_test_by_date = len(filtered_by_date)

    if(total_success_filtered_by_date == 0 | total_number_test_by_date == 0):
        division_success_total = 0
        total_error_filtered_by_date = 0
    else:
        division_success_total = (total_success_filtered_by_date / total_number_test_by_date) * 100
        total_error_filtered_by_date = total_number_test_by_date - total_success_filtered_by_date
        if division_success_total.is_integer():
            division_success_total = int(division_success_total)
        else:
            division_success_total = round(division_success_total, 2)
    
    percent_success = f'{division_success_total}%'
    
    result = {"porcentaje_correcto": percent_success, 
              "correcto": total_success_filtered_by_date, 
              "erroneo": total_error_filtered_by_date, 
              "total" : total_number_test_by_date }
    
    return result

def get_aggregated_data_for_test(test_results:str, current_date, previous_date ):
    aggregated_dict = compute_aggregation(test_results, previous_date, current_date)
    aggregation_dict = {'idTest': str(test_results['idTest'].iloc[0]),
                        'porcentajeCorrecto': aggregated_dict['porcentaje_correcto'],
                        'totalCorrecto': aggregated_dict['correcto'],
                        'totalError': aggregated_dict['erroneo'],
                        'total': aggregated_dict['total'],
                        'fechaCalculo': str(current_date).replace(" ", 'T')
                       }
    if aggregation_dict['total'] == 0:
        aggregation_dict['activo'] = False
    else:
        aggregation_dict['activo'] = True
    return aggregation_dict

def compute_aggregations_to_elastic(es, aggregations_index_name, unique_idTest_list, index_name, current_date, previous_date):
    for hit in unique_idTest_list["aggregations"]["unique_idTest"]['buckets']:
        idTest = hit['key']
        query = {
            "query": {
                "bool": {
                  "must": [
                    {
                      "match": {
                        "idTest": str(idTest)
                      }
                    },
                    {
                      "range": {
                        "fechaProcesado": {
                          "gte": previous_date,
                          "lte": current_date 
                        }
                      }
                    }
                  ]
                }
            }
        }

        data = run_elastic_query(es, query, index_name)
        
        if(len(data) > 0):
            data_df = pd.DataFrame(data)
            if not 'idError' in data_df.columns:
                print("Sin idError")
                data_df['idError'] = 0
            if not 'pathError' in data_df.columns:
                print("Sin pathError")
                data_df['pathError'] = ""
            if not 'errorMsg' in data_df.columns:
                print("Sin errorMsg")
                data_df['errorMsg'] = ""
            if not 'urlFailed' in data_df.columns:
                print("Sin urlFailed")
                data_df['urlFailed'] = ""
            if not 'errorSel' in data_df.columns:
                print("Sin errorSel")
                data_df['errorSel'] = ""
            if not 'elementError' in data_df.columns:
                print("Sin elementError")
                data_df['elementError'] = ""

            data_df['fecha'] = data_df['fecha'].apply(lambda x: datetime.strptime(x, '%Y%m%d%H%M%S'))
            data_df['tiempoPaso'] = data_df['tiempoPaso'].astype(float)
            data_df['idError'] =  data_df['idError'].fillna(0)
            data_df['pathError'] = data_df['pathError'].fillna("")
            data_df['errorMsg'] = data_df['errorMsg'].fillna("")
            data_df['urlFailed'] = data_df['urlFailed'].fillna("")
            data_df['errorSel'] = data_df['errorSel'].fillna("")
            data_df['elementError'] = data_df['elementError'].fillna("")
            data_df['idError'] = data_df['idError'].astype(int)
            data_df = data_df.rename(columns={'type': 'tipo'})

        else:
            print("Data (hits.hits) not found")
            continue
        test_results =  data_df[data_df['tipo'] == "GroupedResult"]
        test_last_grouped_result = data_df[data_df['tipo'] == "GroupedResult"].sort_values('fecha', ascending=False)
        test_last_grouped_result.reset_index(drop=True,inplace=True)

        if (test_last_grouped_result.shape[0]==0):
            aggregation_dict = {'idTest':idTest, 'activo': False}
        else:
            last_execution_date = test_last_grouped_result['fecha'][0]
            last_execution_duration = round(test_last_grouped_result['tiempoPaso'][0],2)
            failed_execution_state = test_last_grouped_result['idError'][0] != 1
            tags = re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', test_last_grouped_result['nombreTest'][0]) + re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', test_last_grouped_result['nombreRobot'][0])  
            enviroment = re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', test_last_grouped_result['nombreRobot'][0])[1]
            test_name =  test_last_grouped_result['nombreTest'][0]
            robot_name =  test_last_grouped_result['nombreRobot'][0]

            aggregation_dict = get_aggregated_data_for_test(test_results, current_date, previous_date)
            aggregation_dict['fechaUltimaEjecucion'] = str(last_execution_date).replace(" ", "T")
            aggregation_dict['duracionUltimaEjecucion'] = str(last_execution_duration)
            aggregation_dict['tags'] = tags
            aggregation_dict['entorno'] = enviroment 
            aggregation_dict['nombreTest'] = test_name
            aggregation_dict['nombreRobot'] = robot_name
            aggregation_dict['errorUltimaEjecucion'] = failed_execution_state   
        res = es.index(index=aggregations_index_name, body=aggregation_dict, id=idTest)
        print("insert correcto", idTest)


def generate_aggregation():

    # Calcular fechas
    #date_format = "%Y%m%d%H%M00" # Sin precision de segundos
    date_format="%Y-%m-%d %H:%M:00"
    current_date = datetime.now().strftime(date_format)
    current_date = datetime.strptime(current_date, date_format)

    previous_date = (current_date + dateutil.relativedelta.relativedelta(days=-1)).strftime(date_format)
    current_date = current_date.strftime(date_format)
    
    # Crear conexion a elastic
    index_name = "raw-asm"
    aggregations_index_name = "aggregations-asm"
    es = connect_to_elastic()

    # Generar agregados
    print("Comienzo de la generación de agregados")
    start_time = time.time()

    unique_idTest_list = get_unique_idTest_from_elastic(es, index_name)

    compute_aggregations_to_elastic(es, aggregations_index_name, unique_idTest_list, index_name, current_date, previous_date)
    end_time = time.time()
    execution_time = end_time - start_time

    print("Fin de la generación de agregados. Duración", execution_time)


# Crear un objeto scheduler
scheduler_object = sched.scheduler(time.time, time.sleep)

# Función para ejecutar la tarea cada minuto
def ejecutar_programa(sc):
    generate_aggregation()
    scheduler_object.enter(300, 1, ejecutar_programa, (sc,))

# Iniciar el programa
scheduler_object.enter(300, 1, ejecutar_programa, (scheduler_object,))
scheduler_object.run()
