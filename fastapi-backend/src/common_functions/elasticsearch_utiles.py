from elasticsearch import Elasticsearch
from elasticsearch.helpers import scan
from elasticsearch.helpers import bulk
from elasticsearch.helpers import BulkIndexError
import configparser # Parsear el fichero de configuración

import warnings

# Deshabilitar warnings para que no aparezcan al confiar en el certificado
warnings.filterwarnings('ignore')

from password_management_utiles import decrypt_password_with_key

def connect_to_elastic():
    
    # Almacenar información de la conexión
    elastic_host = '10.210.4.119'
    elastic_port ='9200'
    elastic_user = 'elastic'
    elastic_password = 'eilv2Dh04gbCBYAouc1o' 
    
    elastic_url = f'https://{elastic_host}:{elastic_port}'

    
    # Crear conexión
    es = Elasticsearch(
        elastic_url,
        basic_auth=(elastic_user, elastic_password),
        verify_certs=False
    )
    return es

def run_elastic_query(elastic_connection, query, index_name):
    page_size = 10000
    scroll_id = None
    
    # Ejecutar query
    response = scan(
            elastic_connection,
            query=query,
            index=index_name,
            scroll="6m",
            size=page_size
    )
    
    # Generar resultado
    results = []
    for hit in response:
        results.append(hit["_source"])

    return results      