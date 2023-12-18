import { TestEntityApi } from './test-view.api-model';

export const getTestViewAPI = (idTest): Promise<TestEntityApi[]> => {
  const promise = new Promise<TestEntityApi[]>((resolve, reject) => {
    const url = `http://localhost:8000/get_test_view/${idTest}`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          console.error('Error recogiendo datos para el test') + idTest;
          resolve({});
        }
      })
      .catch((error) => {
        console.error('Error recogiendo datos para el test: ' + idTest, error);
        esolve({});
      });
  });
  return promise;
};
