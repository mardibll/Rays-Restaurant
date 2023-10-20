import axios from "axios";

export const tags = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/tags")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const apiProduct = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const categori = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
