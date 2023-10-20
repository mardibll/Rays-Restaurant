import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsID } from "../redux/action/productAction";
import { doLogin } from "../redux/action/actionAuth";

export default function Regis() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("mardi@gmail.com");
  const [password, setPassword] = useState("Mm150103$");
  const PRODUCT = useSelector((state) => state.products);
  const PRODUCT_ID = useSelector((state) => state.productsID);
  const TOKEN = useSelector((state) => state.authLogin);
  console.log(TOKEN.token, "TOKEN USER");
  // console.log(PRODUCT.product);
  // console.log(PRODUCT_ID.product);
  const [localProducts, setLocalProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductsID());
  }, [dispatch]);

  useEffect(() => {
    if (PRODUCT) {
      setLocalProducts(PRODUCT.product);
    }
  }, [PRODUCT.product, TOKEN]);

  if (PRODUCT.loading) {
    return <div>Loading...</div>;
  }

  if (PRODUCT.error) {
    return <div>Error: {PRODUCT.error}</div>;
  }
  const handleLogin = () => {
    dispatch(doLogin(email, password));
  };
  return (
    <div>
      <h1>Daftar Produk</h1>
      {/* <ul>
        {localProducts.map((i, x) => {
          // console.log(i,"DS");
        })}
      </ul> */}
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
