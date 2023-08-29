# fastapi-backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import pyodbc as pyodbc

import base64

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

@app.post("/login/")
#def login(request: LoginRequest):
    # Replace this with your actual authentication logic
    #print("username", request.username)
    #print("password", request.password)
    #if request.username == "test" and request.password == "password":
        #user = {"username": request.username, "roles": ["admin"], "tags": ["all"]}
        #return user
    #else:
        #raise HTTPException(status_code=401, detail="Invalid credentials")

def login(request: LoginRequest):

    # Definir parámetros de conexión
    server = "192.168.7.128"  # e.g., "localhost" or "your_server_name\instance_name"
    database = "UserManagement"
    username = "sa"
    password = "P@ssw0rd"

    # Definición de string de conexión
    connection_string = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"

    # Conexión a la base de datos
    connection = pyodbc.connect(connection_string)

    # Apertura de conexión con SQL
    cursor = connection.cursor()

    # Si hemos guardado la contraseña codificada
    pwd_cod = base64.b64encode(request.password.encode("utf-8")).decode("utf-8")

    # 
    query = "SELECT * FROM Users WHERE Password =  %(pwd_cod)s', (pwd_cod,))"
    cursor.execute(query)

    # 
    result = cursor.fetchall()
    if result[0] == request.username:
        print("Login successfull")
    else:
        print("Usuario o contraseña incorrectos")

    # 
    cursor.close()
    connection.close()