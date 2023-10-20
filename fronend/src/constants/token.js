export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

console.log(getToken(),"HALAALsO");
// Menyimpan token ke Local Storage
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

// Menghapus token dari Local Storage
export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
