from oracle_utiles import query_oracle_insert


def create_roles(connection, username, roles):
    values_query = [f"('{username}', '{rol}')"  for rol in roles]
    values_query = (',').join(values_query)
    query = f"insert into Usuarios_roles (Username, Rol) VALUES {values_query} ;"
    query_oracle_insert(connection, query)
    