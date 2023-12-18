import { UserEntityApi } from './user.api-model';
import { emptyUserApi } from './user.api-model';

export const getUserById = async (id: string): Promise<UserEntityApi> => {
  const promise = new Promise<UserEntityApi>((resolve, reject) => {
    const url = `http://localhost:8000/users/${id}`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          console.error(
            'Error recogiendo datos del usuario de la base de datos'
          );
          resolve(emptyUserApi());
        }
      })
      .catch((error) => {
        console.error(
          'Error recogiendo datos del usuario de la base de datos:',
          error
        );
        resolve(emptyUserApi());
      });
  });
  return promise;
};
