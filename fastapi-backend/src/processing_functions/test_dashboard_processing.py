from datetime import date, datetime, timedelta
import pandas as pd
import re
import time
from haralyzer import HarParser, HarPage
import json

from collections import Counter, defaultdict
import os
import requests
from bs4 import BeautifulSoup

from http import HTTPStatus

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
from keras.models import load_model
import joblib


script_dir = os.path.dirname(__file__)
# Define the path to model.h5 relative to the script's directory
model_path = os.path.join(script_dir, 'models/label_encoder.joblib')
url_classification_label_encoder = joblib.load(model_path)

model_path = os.path.join(script_dir, 'models/lstm_best_model.h5')
url_classification_model = load_model(model_path)

import string 
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stopwords_spanish = set(stopwords.words('spanish'))

from common_functions.elasticsearch_utiles import connect_to_elastic, run_elastic_query


def tokenization(sentences):
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(sentences)
    return tokenizer

def encode_sequences(tokenizer, length, lines):
    # Codificar las secuencias con los índices de las palabras
    seq = tokenizer.texts_to_sequences(lines)
    # Hacer el padding
    seq = pad_sequences(seq, maxlen=length, padding='post')
    return seq

def clean_html_data(text):
    # Eliminar saltos de línea
    text = text.replace('\r\n', ' ')
    text = text.replace('\n\n', ' ') 
    text = text.replace('\n', ' ')
    text = text.replace('\r', ' ') 

    # Eliminar espacios innecesarios
    text = re.sub('\s\s+', ' ', text)
    
    # Eliminar caracteres
    #text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'[^\w\sáéíóúÁÉÍÓÚüÜñÑ]', '', text)

    # ELiminar HTML PUBLIC W3CDTD HTML 40 TransitionalEN
    text = text.replace('HTML PUBLIC W3CDTD HTML 40 TransitionalEN', '')
    # Pasar a minusculas
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Remove storpwords 
    # Tokenize the text
    words = word_tokenize(text)
    
    # Remove stopwords
    filtered_words = [word for word in words if word.lower() not in stopwords_spanish]
    
    # Join the filtered words to form the processed text
    processed_text = ' '.join(filtered_words)
    return processed_text

def get_test_aggregation_result(data, sufix_labels):
    total_success_filtered_by_date = len(data[data['idError'] == 1])
    total_number_test_by_date = len(data)

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
    average_execution_time = round(data['tiempoPaso'].mean(), 2)
    result = {"porcentaje_disponibilidad_" + sufix_labels: percent_success, 
              "correcto_" + sufix_labels: total_success_filtered_by_date, 
              "erroneo_" + sufix_labels: total_error_filtered_by_date, 
              "total_" + sufix_labels: total_number_test_by_date,
              "tiempo_medio_ejecucion_" + sufix_labels: average_execution_time
             }
    return result

def get_aggragtions_difference(cuurent_dict, previous_dict):
    differences_dict = {}
    
    for key in cuurent_dict:
        common_key = key.rsplit('_', 1)[0]
        current_key = key
        previous_key = f'{common_key}_previous'
        difference_key = f'{common_key}_difference'
        
        if previous_key in previous_dict:
            if common_key == 'porcentaje_disponibilidad':
                previous_value = float(previous_dict[previous_key].strip('%'))
                current_value = float(cuurent_dict[current_key].strip('%'))
                difference = current_value - previous_value
                differences_dict[difference_key] = round(difference,2)
            else:
                difference = cuurent_dict[current_key] - previous_dict[previous_key]
                differences_dict[difference_key] = round(difference,2)
    
    return differences_dict


def get_har_asm_data(es, index_name, idTest, data_ini, data_fi):
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
                      "gte": data_ini,
                      "lte": data_fi 
                    }
                  }
                }
              ]
            }
        }
    }
    data = run_elastic_query(es, query, index_name)
    data_df = pd.DataFrame(data)
    return data_df


def traducir_codigo_estado(codigo_estado):
    try:
        # Obtener el mensaje asociado al código de estado
        mensaje = HTTPStatus(codigo_estado).phrase
        return f'{codigo_estado} {mensaje}'
    except ValueError:
        # En caso de que el código de estado no sea válido
        return f'Código de estado no válido: {codigo_estado}'

def process_har_data(data_har_df):
    if(data_har_df.empty):
        har_result_dict = {
            "har_table_list": [],
            "common_har_error": {
            'url': '-', 
            'status_text': '-', 
            'server_response_code': '-', 
            'server_response_message': '-', 
            'total': '-'
            }
        }
    
    else:
        har_table_list = []
        for index, row in data_har_df.iterrows():
            har = row['HARFile']
            har_name = row['HARName']
            har_parser = HarParser(har)
            data = har_parser.har_data
            har_information = []
            
            for entry in har_parser.har_data["entries"]:
                har_data_dict= {
                    "server_response_code": entry["response"]["status"],
                    "server_response_message": traducir_codigo_estado(entry["response"]["status"]),
                    "status_text": entry["response"]["statusText"],
                    "url": entry["request"]["url"],
                    "date": entry["startedDateTime"].split('.')[0],
                    "id": (har_name.split('/')[-1]).split('.')[0]
                }
                har_information.append(har_data_dict)
            har_table_list = har_table_list + har_information
            har_table_list_df = pd.DataFrame(har_table_list)
        # Agrupar por URL y encontrar la fila con el máximo número de registros
        top_row = har_table_list_df.groupby(['url','status_text', 'server_response_code', 'server_response_message' ]).size().reset_index(name='total').sort_values(by='total', ascending=False).head(1)
        top_row_dict = top_row.to_dict(orient='records')[0]

        har_result_dict = {
            "har_table_list": har_table_list,
            "common_har_error": top_row_dict
        }

    return har_result_dict

def get_raw_asm_test_data(es, index_name, idTest, data_ini, data_fi):

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
                      "gte": data_ini,
                      "lte": data_fi 
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
            #print("Sin idError")
            data_df['idError'] = 0
            #print(data_df['idError'])
        if not 'pathError' in data_df.columns:
            #print("Sin pathError")
            data_df['pathError'] = ""
        if not 'errorMsg' in data_df.columns:
            #print("Sin errorMsg")
            data_df['errorMsg'] = ""
        if not 'urlFailed' in data_df.columns:
            #print("Sin urlFailed")
            data_df['urlFailed'] = ""
        if not 'errorSel' in data_df.columns:
            #print("Sin errorSel")
            data_df['errorSel'] = ""
        if not 'elementError' in data_df.columns:
            #print("Sin elementError")
            data_df['elementError'] = ""
            
        data_df = data_df.rename(columns={'type': 'tipo'})
        data_df['fecha'] = data_df['fecha'].apply(lambda x: datetime.strptime(x, '%Y%m%d%H%M%S'))
        data_df['tiempoPaso'] = data_df['tiempoPaso'].astype(float)
        data_df['idError'] =  data_df['idError'].fillna(0)
        data_df['pathError'] = data_df['pathError'].fillna("")
        data_df['errorMsg'] = data_df['errorMsg'].fillna("")
        data_df['urlFailed'] = data_df['urlFailed'].fillna("")
        data_df['harFile'] = data_df['urlFailed'].fillna("")
        data_df['errorSel'] = data_df['errorSel'].fillna("")
        data_df['elementError'] = data_df['elementError'].fillna("")
        data_df['idError'] = data_df['idError'].astype(int)

    else:
        data_df = pd.DataFrame()
    return data_df

def process_grouped_result(data, interval_days):
    data.sort_values(['fecha'])
    
    if interval_days < 2:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%d-%m-%Y %H')
    elif interval_days < 31:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%d-%m-%Y')
    elif interval_days < 372:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%m-%Y')
    else:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%Y')
        
    # Generar datos para el gráfico mixto
    grouped_dates_results = data.groupby(['fecha_nueva'])
    average_time = grouped_dates_results['tiempoPaso'].mean()
    failed_tests = grouped_dates_results.apply(lambda group: (group['idError'] == 0).sum())
    success_tests = grouped_dates_results.apply(lambda group: (group['idError'] != 0).sum())
    total_tests = grouped_dates_results.size()
    categories_list = grouped_dates_results.apply(lambda group: group['fecha_nueva'].iloc[0]).tolist()
    availability_list = (round(success_tests/total_tests * 100, 2)).tolist()
    average_time_list =  round(average_time,2).tolist()
    total_errors_list = failed_tests.tolist()
    total_tests_list = total_tests.tolist()
    total_success_list = success_tests.tolist()    

    mirrorChartData = [{
          "name": 'OK',
          "data": [-x for x in total_success_list]
        },{
          "name": 'KO',
          "data": total_errors_list
        }
        ]

    mixedChartData =[{
      "name": 'Disponibilidad',
      "type": 'area',
      "data": availability_list
    },
                     {
      "name": 'Tiempo',
      "type": 'line',
      "data":  average_time_list
    },
    ]

    # Generar datos para la tabla
    table_data_list = []
    boxplot_list = []
    for index, value in enumerate(categories_list):
        table_data = {
            "fecha": categories_list[index],
            "disponibilidad": availability_list[index],
            "duracionMedia": average_time_list[index],
            "totalErrores": total_errors_list[index],
            "totalMuestras": total_tests_list[index],
        }
        table_data_list.append(table_data)

        boxplot_data  = {
            "x": categories_list[index],
            "y": total_errors_list[index]
        }
        boxplot_list.append(boxplot_data)
    
    process_result_dict = {
         "mixedChartCategories": categories_list,
         "mixedChartData": mixedChartData,
         "groupedResultTests": table_data_list,
         "boxplotSeries": [{"data": boxplot_list}],
         "mirrorChartData": mirrorChartData
    }

    return process_result_dict         

def process_steps_result(data, interval_days):
    data.sort_values(['fecha', 'idPaso'])
    if interval_days < 2:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%d-%m-%Y %H')
    elif interval_days < 31:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%d-%m-%Y')
    elif interval_days < 372:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%m-%Y')
    else:
        data['fecha_nueva'] = data['fecha'].dt.strftime('%Y')
        
    grouped_by_results = data.groupby(['fecha_nueva', 'idPaso'])
 
    # Realizar calculos agregados
    average_time = grouped_by_results['tiempoPaso'].mean()
    failed_tests = grouped_by_results.apply(lambda group: (group['idError'] != 0).sum())
    success_tests = grouped_by_results.apply(lambda group: (group['idError'] == 0).sum())
    total_tests = grouped_by_results.size()
    categories_list = grouped_by_results.apply(lambda group: group['fecha_nueva'].iloc[0]).tolist()
    idPaso_list = grouped_by_results.apply(lambda group: group['idPaso'].iloc[0]).tolist()
    #nombrePaso_list = grouped_by_results.apply(lambda group: group['nombrePaso'].iloc[0]).fillna("Sin nombre").tolist()
    nombrePaso_list = grouped_by_results.apply(lambda group: group['nombrePaso'].iloc[0]).fillna("Sin nombre").tolist()

    availability_list = (round(success_tests/total_tests, 2)* 100).tolist()
    average_time_list =  round(average_time, 2).tolist()
    total_errors_list = failed_tests.tolist()
    total_tests_list = total_tests.tolist()

    # Generar datos para la tabla
    table_data_list = []
    for index, value in enumerate(categories_list):
        table_data = {
            "fecha": categories_list[index],
            "disponibilidad": availability_list[index],
            "duracionMedia": average_time_list[index],
            "totalErrores": total_errors_list[index],
            "totalMuestras": total_tests_list[index],
            #"idPaso": idPaso_list[index],
            "idPaso": nombrePaso_list[index],
            "nombrePaso": nombrePaso_list[index]
        }
        table_data_list.append(table_data)

    # Generar datos para las gráficas
    data_aggregation_dict = {
        "fecha": categories_list,
        "nombrePaso": nombrePaso_list,
        #"idPaso": idPaso_list,
        "idPaso": nombrePaso_list,
        "disponibilidad": availability_list,
        "duracionMedia": average_time_list,
        "totalErrores": total_errors_list
    }
    data_aggregation_df = pd.DataFrame(data_aggregation_dict)
    grouped_by_idPaso = data_aggregation_df.groupby(['idPaso'])
    timeCategories = data_aggregation_df['fecha'].unique().tolist()

    ## Generar los datos para el Timeline Chart
    time_data_df = grouped_by_idPaso['duracionMedia'].agg(list).reset_index()
    timeChartSeries = []

    for index, row in time_data_df.iterrows():
        id_paso = row['idPaso']
        duracion_lista = row['duracionMedia']
        result_dict = {"name": "Paso " + id_paso ,
            "data": duracion_lista
        }
        timeChartSeries.append(result_dict)
    
    ## Generar los datos para el grafico de disponibilidad
    availability_data_df = grouped_by_idPaso['disponibilidad'].agg(list).reset_index()
    availabilityChartSeries = []

    for index, row in availability_data_df.iterrows():
        id_paso = row['idPaso']
        disponibilidad_lista = row['disponibilidad']
        result_dict = {"name": "Paso " + id_paso ,
            "data": disponibilidad_lista
            }
        availabilityChartSeries.append(result_dict)
    
    ## Generar los datos para el grafico circular
    radial_data_df = round(grouped_by_idPaso['disponibilidad'].mean(),2)
    radialChartLabels = ("Paso " + radial_data_df.index.values).tolist()
    radialChartSeries = (radial_data_df.values).tolist()

    ## Generar los datos para el grafico de pirámide
    pyramid_data_df = grouped_by_idPaso['totalErrores'].sum()
    pyramidChartLabels = ("Paso " + pyramid_data_df.index.values).tolist()
    pyramidChartSeries = [{"name": "", "data":(pyramid_data_df.values).tolist()}]

    process_result_dict = {
        "resultSteps": table_data_list,
        "timeChartSeries": timeChartSeries,
        "timeCategories": timeCategories,
        "availabilityChartSeries": availabilityChartSeries,
        "radialChartLabels": radialChartLabels,
        "radialChartSeries": radialChartSeries,
        "pyramidChartLabels": pyramidChartLabels,
        "pyramidChartSeries": pyramidChartSeries
    }

    return process_result_dict

def process_url_failed(url_failed_list):
    processed_url_list = []
    processed_url = []
    combined_counter = Counter()

    for url in url_failed_list:
        base_url =  url.split('?')[0]
        if not base_url in processed_url_list:
            t0 = time.time()
            try:
                url_response = requests.get(url)
                url_response = requests.get(url, verify=False, cookies=url_response.cookies)
                response_delay = time.time() - t0
            except:
                print("error getting url", url)
                break
            
            soup = BeautifulSoup(url_response.content)
            main_div = soup.find_all(class_="main")
            if(len(main_div) > 0):
                main_div = main_div[0]
            else:
                main_div = soup
            #texts = main_div.findAll(text=True)
            for script in main_div(['script', 'style']):
                script.extract()

            # Remove onclick attributes
            for element in soup.find_all():
                if 'onclick' in element.attrs:
                    del element.attrs['onclick']

            # Extract text content from HTML (without script elements and onclick attributes)
            text_from_html = ' '.join(soup.stripped_strings)
            #text_from_html = ' '.join(texts)
            text_from_html = [clean_html_data(text_from_html)]
            # Find relevant words
            words = re.findall(r'\b\w+\b', text_from_html[0].lower())
            word_counts = Counter(words)
            combined_counter.update(word_counts)

            top_words = word_counts.most_common(5)
            top_words = [word for word, _ in top_words]

            #text_from_html = BeautifulSoup(text_from_html, "lxml").text
            
            tokenizer = tokenization(text_from_html)
            max_length=30
            text_encoded = encode_sequences(tokenizer, max_length, text_from_html)
            predictions = url_classification_model.predict(text_encoded)
            predicted_labels = predictions.argmax(axis=1)
            decoded_label = url_classification_label_encoder.inverse_transform(predicted_labels)[0]
            processed_url_list.append(base_url)
            processed_url.append({"url": base_url,"class": decoded_label, "top_words": top_words})
    word_counter_dict = defaultdict(int)
    
    for word, count in combined_counter.items():
        word_counter_dict[word] += count
    word_counter_dict_result = [{'text': word, 'value': count} for word, count in word_counter_dict.items()]
    word_counter_dict_result = word_counter_dict_result[0:20]
    result_dict = {
        "urlFailedTable" : processed_url,
        "wordCloudData": word_counter_dict_result
    }
 
    return result_dict



def get_test_dashboard_data(es, index_name, idTest, datetime_ini_str, datetime_fi_str, previous_datetime_ini_str, previous_datetime_fi_str, interval_days):
    data_current_df = get_raw_asm_test_data(es, index_name, idTest, datetime_ini_str, datetime_fi_str)
    data_previous_df = get_raw_asm_test_data(es, index_name, idTest, previous_datetime_ini_str, previous_datetime_fi_str)

    if data_current_df.empty:
        print("data_current_df (hits.hits) not found")
        return {}
    
    if data_previous_df.empty:
        print("data_previous_df (hits.hits) not found")
        return {}

    current_grouped_test_results = data_current_df[data_current_df['tipo'] == "GroupedResult"]
    tags = re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', current_grouped_test_results['nombreTest'].iloc[0]) + re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', current_grouped_test_results['nombreRobot'].iloc[0])  
    enviroment = re.findall(r'[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))', current_grouped_test_results['nombreRobot'].iloc[0])[1]
    nombreTest = current_grouped_test_results['nombreTest'].iloc[0]
    nombreRobot = current_grouped_test_results['nombreRobot'].iloc[0]
    
    previous_grouped_test_results = data_previous_df[data_previous_df['tipo'] == "GroupedResult"]
    

    # Generar los diccionario de agregados para cada perioso y calcular las diferencias
    current_aggregation_result = get_test_aggregation_result(current_grouped_test_results, "current")
    previous_aggregation_result = get_test_aggregation_result(previous_grouped_test_results,  "previous")
    difference_dict = get_aggragtions_difference(current_aggregation_result, previous_aggregation_result)
    
    # Procesar los test GroupedResult agrupados por fecha
    process_grouped_dict = process_grouped_result(current_grouped_test_results, interval_days)

    # Procesar los test de typo Result por paso y fecha
    current_ungrouped_test_results = data_current_df[data_current_df['tipo'] != "GroupedResult"]
    process_steps_dict = process_steps_result(current_ungrouped_test_results, interval_days)
    

    failed_url_list = current_ungrouped_test_results['urlFailed'].unique().tolist()
    failed_url_list = [item for item in failed_url_list if item != '']
    process_url_failed_result = process_url_failed(failed_url_list)

    # Process har data
    data_har_df = get_har_asm_data(es, "har-asm", idTest, datetime_ini_str, datetime_fi_str)
    har_result_dict = process_har_data(data_har_df)

    final_response_dict = {
        **current_aggregation_result,
        **previous_aggregation_result,
        **difference_dict,
        **process_grouped_dict,
        **process_steps_dict,
        **har_result_dict,
        **process_url_failed_result,
        "idTest": idTest,
        "nombreTest": nombreTest,
        "tags": tags,
        "entorno": enviroment
    }
    #print(final_response_dict)
    return final_response_dict
    
def generate_test_dashboard_data(test_id):
    index_name="raw-asm"
    start_time = time.time()

    # Calcular fecha inicio y fecha fin
    datetime_ini = datetime.now() - timedelta(days=1)
    datetime_ini = str(datetime_ini) 
    datetime_ini = datetime.strptime(datetime_ini, "%Y-%m-%d %H:%M:%S.%f")
    datetime_ini_str = datetime_ini.strftime("%Y-%m-%d %H:%M:%S")
    #print("datetime_ini", datetime_ini_str)

    datetime_fi = datetime.now()
    datetime_fi = str(datetime_fi)
    datetime_fi = datetime.strptime(datetime_fi,"%Y-%m-%d %H:%M:%S.%f")
    datetime_fi_str = datetime_fi.strftime("%Y-%m-%d %H:%M:%S")
    #print("datetime_fi", datetime_fi_str)

    # Obtener periodo anterior
    interval_days = (datetime_fi - datetime_ini).days
    #print("interval_days", interval_days)
    previous_datetime_ini = datetime_ini - timedelta(days=interval_days)
    previous_datetime_ini_str = previous_datetime_ini.strftime("%Y-%m-%d %H:%M:%S")
    #print("previous_datetime_ini", previous_datetime_ini_str)

    previous_datetime_fi = datetime_fi - timedelta(days=interval_days)
    previous_datetime_fi_str = previous_datetime_fi.strftime("%Y-%m-%d %H:%M:%S")
    #print("previous_datetime_fi", previous_datetime_fi_str)

    es = connect_to_elastic()

    response_result= get_test_dashboard_data(es= es, 
                                             index_name=index_name, 
                                             idTest=test_id, 
                                             datetime_ini_str=datetime_ini_str, 
                                             datetime_fi_str=datetime_fi_str,
                                             previous_datetime_ini_str=previous_datetime_ini_str, 
                                             previous_datetime_fi_str=previous_datetime_fi_str,
                                             interval_days=interval_days
                                             )
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("END generate_test_dashboard_data",str(elapsed_time))
    return response_result

