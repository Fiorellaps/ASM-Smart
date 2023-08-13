# fastapi-backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel


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
    print("username", request.username)
    print("password", request.password)
    if request.username == "test" and request.password == "password":
        user = {"username": request.username, "roles": ["admin"], "tags": ["all"]}
        return user
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
