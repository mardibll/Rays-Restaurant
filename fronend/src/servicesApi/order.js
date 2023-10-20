import axios from "axios";

export const orderProduct = (Token, data) => {
  // console.log(data,Token);
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/orders", data, {
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
