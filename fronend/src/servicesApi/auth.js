import axios from "axios";

export const regist = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/auth/register", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("Gagal Regist !!!");
        reject(err);
      });
  });
};
export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/auth/login", data)
      .then((res) => {
        resolve(res.data);
        localStorage.setItem("TOKEN", res.data.token);
        console.log("berhasil login");
      })
      .catch((err) => {
        console.log("berhasil gagal !!!");
        reject(err);
      });
  });
};

export const logouts = () => {

  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/auth/logout")
      .then((res) => {
        resolve(res);
        localStorage.removeItem("TOKEN");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const user = (Token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/auth/me", {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

