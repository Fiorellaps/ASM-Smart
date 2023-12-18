from cryptography.fernet import Fernet # generar Fernet key
import configparser # Parsear el fichero de configuración


# Generar key con el nombre de fichero dado
def generate_encryption_key(dest_file_path:str):    
    # Generate a random encryption key
    key = Fernet.generate_key()

    # Save the encryption key to a file (you should protect this file securely)
    with open(dest_file_path, 'wb') as key_file:
        key_file.write(key)

def encrypt_password_with_key(password:str, 
                              key_file_path:str, 
                              config_file_path:str, 
                              connection_name:str,
                              parameter_name="password"):
    # Cargar el ficheo con laclave
    with open(key_file_path, 'rb') as key_file:
        key = key_file.read()

    # Crear un cifrado Fernet con la clave
    cipher_suite = Fernet(key)

    # Contraseña a encriptar
    password_to_encrypt = password.encode()  # Convertir a bytes

    # Encriptar contraseña
    encrypted_password = cipher_suite.encrypt(password_to_encrypt)

    # Actualizar fichero de configuración
    config = configparser.ConfigParser()
    config.read(config_file_path)  # Cargar el ficer de configuración

    # Almacenar contraseña encriptada en el fichero de configuración
    config.set(connection_name, parameter_name, encrypted_password.decode())
    # Otra forma de hacerlo
    #config[connection_name][parameter_name] = encrypted_password.decode()  # Convert to a string

    # Guardar configuración nueva
    with open(config_file_path, 'w') as config_file:
        config.write(config_file)


def decrypt_password_with_key(key_file_path:str, 
                              config_file_path:str, 
                              connection_name:str,
                              parameter_name="password"):
    # Cargar el ficheo con la clave
    with open(key_file_path, 'rb') as key_file:
        key = key_file.read()

    # Crear un cifrado Fernet con la clave
    cipher_suite = Fernet(key)
    
    # Leer la contraseña encriptada del fichero de configuración
    config = configparser.ConfigParser()
    config.read(config_file_path)  # Cargar el ficer de configuración
    
    encrypted_password = config.get(connection_name, parameter_name).encode()

    # Desencriptar contraseña
    decrypted_password = cipher_suite.decrypt(encrypted_password).decode()  # Convertir a string
    return decrypted_password


