import { UserSession } from 'common-app/auth';

export const createEmptyLoginResult = (): UserSession => ({
  userName: '',
  roles: [],
  tags: [],
  id: '',
  active: false,
});

export const isValidLogin = (
  username: string,
  password: string
): Promise<UserSession> =>
  new Promise((resolve) => {
    const url = 'http://localhost:8000/login/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.userName && data.active == 1) {
          data.active = data.active == 1;
          resolve(data);
        } else {
          console.error('Usuario o contraseña incorrectos', data.detail);
          resolve(createEmptyLoginResult());
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        resolve(createEmptyLoginResult());
      });
  });
