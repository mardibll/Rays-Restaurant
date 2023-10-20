import axios from "axios";
export const troli = (Token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/carts", {
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
export const updateTroli = (Token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://localhost:5000/carts", data, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addTroli = (Token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/carts", data, {
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
export const deleteTroli = (Token, id_Cart) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://localhost:5000/carts/${id_Cart}`, {
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
