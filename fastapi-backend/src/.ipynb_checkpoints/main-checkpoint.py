from fastapi import FastAPI, HTTPException

# fastapi-backend/main.py
#from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
#from common_functions import connect_to_oracle, check_user

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str




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

def create_roles(connection, username, roles):
    values_query = [f"('{username}', '{rol}')"  for rol in roles]
    values_query = (',').join(values_query)
    query = f"insert into Usuarios_roles (Username, Rol) VALUES {values_query} ;"
    query_oracle_insert(connection, query)
    
def create_tags(connection, username, tags):
    values_query = [f"('{username}', '{tag}')"  for tag in tags]
    values_query = (',').join(values_query)
    query = f"insert into Usuarios_tags (Username, Tag) VALUES {values_query} ;"
    query_oracle_insert(connection, query)

def check_user(connection, username, password):    
    query = f"Select * from Usuarios where Username = '{username}'"
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

            query = f"select * from Usuarios_tags where username = '{username}'"
            tags = query_oracle_select(connection, query)['Tag']
            tags = list(tags)
            
            query = f"select * from Usuarios_roles where username = '{username}'"
            roles = query_oracle_select(connection, query)['Rol']
            roles = list(roles)
            
            user = {"username": username, "roles": roles, "tags": tags}
            return user
        
        else:
            print("Contraseña incorrecta!")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        

def get_users_list(connection):    
    query = f"Select * from Usuarios"
    query_result = query_oracle_select(connection, query)
    
    users_list = []

    if(not query_result.empty):
        

        for index, usuario in query_result.iterrows():
            username = usuario['Username']
            query = f"select * from Usuarios_tags where username = '{username}'"
            tags = query_oracle_select(connection, query)['Tag']
            tags = list(tags)
            
            query = f"select * from Usuarios_roles where username = '{username}'"
            roles = query_oracle_select(connection, query)['Rol']
            roles = list(roles)
            
            user = {"username": username, "roles": roles, "tags": tags}
            users_list.append(user)
    else: 
        user = {"username": "", "roles": [], "tags": []}
        users_list.append(user)
        
    return users_list
            


        


@app.post("/login/")
def login(request: LoginRequest):
    # Replace this with your actual authentication logic
    print("username", request.username)
    print("password", request.password)
    
    oracle_connection = connect_to_oracle()
    
    return check_user(oracle_connection, request.username, request.password)
    '''print("oracle_connection")
    query = f"SELECT * FROM Users where username='{request.username}'"
    result = query_to_oracle(oracle_connection, query)
    print("query_to_oracle", result)

    if request.username == "test" and request.password == "password":
        user = {"username": request.username, "roles": ["admin"], "tags": ["all"]}
        return user
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    '''


@app.get("/users_list/")
def get_users():
    print("IN get_users_list")
    oracle_connection = connect_to_oracle()
    result = get_users_list(oracle_connection)
    print("get_users_list",result )
    return result
