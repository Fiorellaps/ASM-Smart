from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import pandas as pd
import sys
sys.path.append("C:/Users/FPA/proyectos/asm-web/tfm-ism/fastapi-backend/src")
sys.path.append("C:/Users/FPA/proyectos/asm-web/tfm-ism/fastapi-backend/src/common_functions")

from common_functions.user_management_utiles import create_user, check_user
from common_functions.oracle_utiles import query_oracle_insert, query_oracle_select, connect_to_oracle
from common_functions.tags_management_utiles import create_tags
from common_functions.roles_management_utiles import create_roles
from processing_functions.users_processing import get_user_by_id, get_users_list

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
def login(request: LoginRequest):
    # Replace this with your actual authentication logic
    print("userName", request.username)
    print("password", request.password)
    
    oracle_connection = connect_to_oracle()
    
    return check_user(connection=oracle_connection, username=request.username, password=request.password)
    '''print("oracle_connection")
    query = f"SELECT * FROM Users where username='{request.username}'"
    result = query_to_oracle(oracle_connection, query)
    print("query_to_oracle", result)

    if request.username == "test" and request.password == "password":
        user = {"userName": request.username, "roles": ["admin"], "tags": ["all"]}
        return user
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    '''

@app.get("/users_list/")
def get_user_list():
    oracle_connection = connect_to_oracle()
    result = get_users_list(oracle_connection)

    return result

@app.get("/user/{id}")
def get_user(id: str):
    oracle_connection = connect_to_oracle()
    result = get_user_by_id(connection=oracle_connection, user_id=id)

    return result
