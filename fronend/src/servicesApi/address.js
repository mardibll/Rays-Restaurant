import axios from "axios";

export const address = (Token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/delivery-addresses", {
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
export const addAddress = (Token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/delivery-addresses", data, {
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
export const removeAddress = (Token, id_address) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://localhost:5000/delivery-addresses/${id_address}`, {
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

export const propinsi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const kabupaten = (id_kab) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id_kab}.json`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const kecamatan = (id_kec) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${id_kec}.json`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const kelurahan = (id_lurah) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${id_lurah}.json`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
