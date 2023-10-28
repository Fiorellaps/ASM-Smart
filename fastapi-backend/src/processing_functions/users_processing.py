from common_functions.oracle_utiles import query_oracle_select

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
            
            email = query_result['Email'].iloc[0]
            active = 1 if query_result['Active'].iloc[0] else 0
            id = str(query_result['Id'].iloc[0])
            
            user = {"userName": username, "roles": roles, "tags": tags, "email": email, "active": active, "id": id}

            users_list.append(user)
    else: 
        user = {"userName": "", "roles": [], "tags": [], "email": "", active: 0}
        users_list.append(user)
        
    return users_list
            

def get_user_by_id(connection, user_id):    
    query = f"Select * from Usuarios where Id={user_id}"
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
            
            email = query_result['Email'].iloc[0]
            active = 1 if query_result['Active'].iloc[0] else 0
            id = str(query_result['Id'].iloc[0])
            
            user = {"userName": username, "roles": roles, "tags": tags, "email": email, "active": active, "id": id}

            users_list.append(user)
    else: 
        user = {"userName": "", "roles": [], "tags": [], "email": "", active: 0}
        users_list.append(user)
        
    return users_list

