from oracle_utiles import query_oracle_insert

def create_tags(connection, username, tags):
    values_query = [f"('{username}', '{tag}')"  for tag in tags]
    values_query = (',').join(values_query)
    query = f"insert into Usuarios_tags (Username, Tag) VALUES {values_query} ;"
    query_oracle_insert(connection, query)
