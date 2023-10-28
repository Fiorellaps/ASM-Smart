import { UserEntityApi } from "./user-list.api-model";

export const getUsers = (): Promise<UserEntityApi[]> => {
  const promise = new Promise<UserEntityApi[]>((resolve, reject) => {
    const url = "http://localhost:8000/users_list/";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          console.error("Error recogiendo usuarios de la base de datos");
          resolve([]);
        }
      })
      .catch((error) => {
        console.error("Error recogiendo usuarios de la base de datos:", error);
        resolve([]);
      });
  });
  return promise;
};
