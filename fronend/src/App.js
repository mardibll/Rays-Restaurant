import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./view/auth/Login";
import Register from "./view/auth/Register";
import Home from "./view/home";
import Account from "./view/account";
import Troli from "./view/troli";
import Konfirmasi from "./view/checkout/konfirmasi";
import Checkout from "./view/checkout";
import DetailInvoice from "./view/invoice/detailInvoice";
import Layout from "./view/layout";
export default function App() {
  // const [serch, setserch] = useState("");
  const [sumTroli, setsumTroli] = useState("");
  const [kategories, setkategories] = useState("Kategori");
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((ress) => {
        // console.log(ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sumTroli, kategories]);

  return (
    <BrowserRouter>
      <Layout

        itemTroli={sumTroli}
        setkategori={setkategories}
      >
        <Routes>
          <Route
            index
            element={<Home filterKategori={kategories} />}
          />
          <Route path="Account" element={<Account />} />
          <Route path="Troli" element={<Troli setItemTroli={setsumTroli} />} />
          <Route path="DetailInvoice" element={<DetailInvoice />} />
          <Route path="Checkout" element={<Checkout />} />
          <Route path="Konfirmasi" element={<Konfirmasi />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  );
}
