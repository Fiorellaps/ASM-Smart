import { UserEntityApi } from "./user.api-model";
import { emptyUser } from "./user.api-model";
export const getUsers = (id: string): Promise<UserEntityApi> => {
  const promise = new Promise<UserEntityApi>((resolve, reject) => {
    const url = `http://localhost:8000/user/${id}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          console.error("Error recogiendo usuario de la base de datos");
          resolve(emptyUser);
        }
      })
      .catch((error) => {
        console.error("Error recogiendo usuario de la base de datos:", error);
        resolve(emptyUser);
      });
  });
  return promise;
};
