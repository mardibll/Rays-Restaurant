import axios from "axios";

export const invoice = (Token, Id_order) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/invoice/${Id_order}`, {
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

export const orders = (Token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/orders", {
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
