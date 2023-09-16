from fastapi import FastAPI, HTTPException

import hashlib
import os
import secrets
import pandas as pd
import pyodbc

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
    print("query", query)
    result_df = pd.read_sql(query, connection)

    return result_df


def query_oracle_insert(connection, query):
    cursor = connection.cursor()
    print("query", query)
    
    cursor.execute(query)

    # Commit the transaction
    connection.commit()
    cursor.close()


def create_user(connection, username, password):
    # Crear hex aleatorio
    salt_hex= secrets.token_hex(8)
    salt = bytes.fromhex(salt_hex)
    print("salt", salt)

    # Concatenar salt y contraseña
    password_salt = password.encode() + salt
    
    # Crear hash
    sha256_hash = hashlib.sha256(password_salt).hexdigest()
    print("SHA-256 Hash with Salt:", sha256_hash)
    
    query = f"Insert into Usuarios (Username, PasswordHash, Salt) VALUES ('{username}', '{sha256_hash}' , '{salt_hex}');"
    query_oracle_insert(connection, query)
    print("query_result")

    
def check_user(connection, username, password):    
    query = f"Select * from Usuarios  where Username = '{username}'"
    query_result = query_oracle_select(connection, query)

    if(query_result.empty):
        print("No existe el usuario!!")
    else:
        print("Existe el usuario")
        password_hashed = query_result['PasswordHash'].iloc[0]
        print(password_hashed)
        salt_hex = query_result['Salt'].iloc[0]
        print(salt_hex)
        salt = bytes.fromhex(salt_hex)
        
        given_password_salt = password.encode() + salt
    
        # Crear hash
        given_sha256_hash = hashlib.sha256(given_password_salt).hexdigest()
        print(given_sha256_hash)
        if given_sha256_hash == password_hashed:
            print("Contraseña correcta!")
            user = {"username": username, "roles": ["admin"], "tags": ["all"]}
            return user
        
        else:
            print("Contraseña incorrecta!")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        

        