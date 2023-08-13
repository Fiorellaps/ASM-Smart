export const doLogin = (
  username: string,
  password: string
): Promise<Boolean> => {
  const promise = new Promise<Boolean>((resolve, reject) => {
    // Simulating Ajax Call
    const url = "http://localhost:8000/login/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.username) {
          resolve(data);
        } else {
          console.error("Usuario o contraseña incorrectos", data.detail);
          resolve(false);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        resolve(false);
      });
  });
  return promise;
};
