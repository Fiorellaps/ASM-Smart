import pyodbc
import pandas as pd

def connect_to_oracle():
    # Definir parámetros de conexión
    server = "192.168.7.128"  # e.g., "localhost" or "your_server_name\instance_name"
    database = "UserManagement"
    username = "sa"
    password = "P@ssw0rd"

    # Definición de string de conexión
    connection_string = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"

    # Conexión a la base de datos
    connection = pyodbc.connect(connection_string)
    return connection

def query_oracle_select(connection, query):
    #print("query", query)
    result_df = pd.read_sql(query, connection)

    return result_df

def query_oracle_insert(connection, query):
    cursor = connection.cursor()
    #print("query", query)
    
    cursor.execute(query)

    # Commit the transaction
    connection.commit()
    cursor.close()

