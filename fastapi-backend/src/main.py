from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import pandas as pd
import sys
from dateutil import parser
import json
import numpy as np

sys.path.append("C:/Users/FPA/proyectos/asm-web/tfm-ism/fastapi-backend/src")
sys.path.append("C:/Users/FPA/proyectos/asm-web/tfm-ism/fastapi-backend/src/common_functions")

from common_functions.user_management_utiles import check_user
from common_functions.oracle_utiles import connect_to_oracle
from common_functions.tests_management_utiles import get_test_list

from processing_functions.users_processing import get_user_by_id, get_users_list
from processing_functions.main_dashboard_processing import  process_main_dashboard_data
from processing_functions.test_dashboard_processing import generate_test_dashboard_data

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

@app.get("/tests_list/")
def get_tests_list():
    result = get_test_list()
    print("/tests_list/")
    return result

@app.get("/users_list/")
def get_user_list():
    oracle_connection = connect_to_oracle()
    result = get_users_list(oracle_connection)

    return result

@app.get("/user/{id}")
def get_user(id: str):
    oracle_connection = connect_to_oracle()
    result = get_user_by_id(connection=oracle_connection, user_id=id)

@app.get("/get_dashboard/")
def get_dashboard():
    print("get_dashboard sin fechas")
    result = process_main_dashboard_data()
    return result

    

@app.get("/get_dashboard/{init_date}/{end_date}")
def get_dashboard(init_date: str, end_date:str):
    print("get_dashboard")
    print("init_date", init_date)
    print("end_date", end_date)
    
    # Process init date
    init_date = init_date.split(' GMT')[0]
    # Parse the modified timestamp string
    init_date_parsed = parser.parse(init_date)
    
    # Process end date
    end_date = end_date.split(' GMT')[0]
    # Parse the modified timestamp string
    end_date_parsed = parser.parse(end_date)

    result = process_main_dashboard_data(datetime_ini=init_date_parsed, datetime_fi=end_date_parsed)
    # Helper function to handle int64 type
    def convert_to_builtin_type(obj):
        if isinstance(obj, np.int64):
            return int(obj)
        raise TypeError("Object of type {} is not JSON serializable".format(type(obj)))

    # Convert the dictionary to JSON with custom function
    json_data = json.dumps(result, default=convert_to_builtin_type)
    return json.dumps(json_data)


@app.get("/get_test_view/{test_id}")
def get_test_view(test_id:str):
    print("get_test_view", test_id)
    result = generate_test_dashboard_data(test_id)
    return result