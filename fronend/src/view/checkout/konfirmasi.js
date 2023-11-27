import React, { useEffect, useState } from "react";
import { address } from "../../servicesApi/address";
import { useLocation, useNavigate } from "react-router-dom";
import { orderProduct } from "../../servicesApi/order";

export default function Konfirmasi() {
  const navigation = useNavigate();
  const [token, settoken] = useState(localStorage.getItem("TOKEN"));
  const [deliveryAddress, setdeliveryAddress] = useState({});
  const location = useLocation();
  const [data, setdata] = useState({});
  useEffect(() => {
    filterData();
  }, []);

  const filterData = () => {
    location.state.map((address) => {
      setdeliveryAddress(address);
    });
    const product = JSON.parse(localStorage.getItem("troli"));
    const id_Cart = product.map((it) => it._id);
    const subTotal = product.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );
    const ongkir = (parseInt(subTotal) * 20) / 100;
    const bayar = ongkir + subTotal;
    setdata({ ...data, subTotal, ongkir, bayar, id_Cart });
  };

  const Bayar = async () => {
    const dataInvoice = {
      delivery_fee: data?.ongkir,
      delivery_address: deliveryAddress?._id,
      itemId: data?.id_Cart,
    };
    try {
      const respon = await orderProduct(token, dataInvoice);
      if (respon._id) {
        navigation("/DetailInvoice", { state: respon._id });
        window.location.reload();
      } else {
        console.log("Gagal Bayar!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div className="card" style={{ width: "60%" }}>
        <div
          className="card-header"
          style={{ border: "none", borderRadius: 0 }}
        >
          Checkout
        </div>
        <div style={{ padding: 20 }}>
          <h4>Konfirmasi</h4>

          <table className="table  ">
            <thead>
              <tr>
                <th scope="col" className="" />
                <th scope="col" />
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Alamat</td>
                <td style={{ width: "50%" }}>
                  {deliveryAddress.propinsi} {deliveryAddress.kabupaten}{" "}
                  {deliveryAddress.kecamatan} {deliveryAddress.kelurahan}{" "}
                  {deliveryAddress.detail}
                </td>
              </tr>
              <tr>
                <td>Sub Total</td>
                <td>{data?.subTotal}</td>
              </tr>
              <tr>
                <td>Ongkir</td>
                <td>{data?.ongkir}</td>
              </tr>
              <tr>
                <td>
                  <h6>Bayar</h6>
                </td>
                <td>
                  <h6>{data?.bayar}</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{
                backgroundColor: "blue",
                border: "none",
                height: 30,
                borderRadius: 3,
                color: "white",
              }}
            >
              Sebelumnya
            </button>
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                height: 30,
                borderRadius: 3,
                color: "white",
              }}
              onClick={() => Bayar()}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
