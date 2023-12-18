import { TestEntityApi } from './test-list.api-model';

export const getTests = (): Promise<TestEntityApi[]> => {
  const promise = new Promise<TestEntityApi[]>((resolve, reject) => {
    const url = 'http://localhost:8000/tests_list/';
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          console.error('Error recogiendo usuarios de la base de datos');
          resolve([]);
        }
      })
      .catch((error) => {
        console.error('Error recogiendo usuarios de la base de datos:', error);
        resolve([]);
      });
  });
  return promise;
};
