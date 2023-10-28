import hashlib
import secrets
from fastapi import HTTPException

from oracle_utiles import query_oracle_insert, query_oracle_select

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
    query = f"Select * from Usuarios where Username = '{username}'"
    query_result = query_oracle_select(connection, query)

    if(query_result.empty):
        print("No existe el usuario!!")
    else:
        print("Existe el usuario")
        password_hashed = query_result['PasswordHash'].iloc[0]

        salt_hex = query_result['Salt'].iloc[0]
        salt = bytes.fromhex(salt_hex)
        
        given_password_salt = password.encode() + salt
    
        # Crear hash
        given_sha256_hash = hashlib.sha256(given_password_salt).hexdigest()

        if given_sha256_hash == password_hashed:
            print("Contraseña correcta!")

            query = f"select * from Usuarios_tags where username = '{username}'"
            tags = query_oracle_select(connection, query)['Tag']
            tags = list(tags)
            
            query = f"select * from Usuarios_roles where username = '{username}'"
            roles = query_oracle_select(connection, query)['Rol']
            roles = list(roles)

            email = query_result['Email'].iloc[0]
            active = 1 if query_result['Active'].iloc[0] else 0
            id = str(query_result['Id'].iloc[0])

            user = {"userName": username, "roles": roles, "tags": tags, "email": email, "active": active, "id": id}

            return user
        
        else:
            print("Contraseña incorrecta!")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
