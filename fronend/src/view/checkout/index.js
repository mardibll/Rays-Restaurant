import React, { useEffect, useState } from "react";
import { address } from "../../servicesApi/address";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Table from "../../component/table";
import { useSelector } from "react-redux";
export default function Checkout() {

  const navigation = useNavigate();
  // console.log(window.location.pathname, "INI NAVI");
  const [token, settoken] = useState(localStorage.getItem("TOKEN"));
  const [delivery, setdelivery] = useState([]);
  const [active, setactive] = useState(false);
  useEffect(() => {
    deliveryAddress();
  }, []);
  // useEffect(() => {
  //   if (window.location.pathname === "/Checkout") {
  //     navigation("/");
  //     console.log("TEST");
  //   }
  // }, [window.location.pathname]);

  const deliveryAddress = async () => {
    const respon = await address(token);
    const newdata = respon.data.data.map((it, ix) => {
      it["checked"] = false;
      return it;
    });
    setdelivery(newdata);
  };
  const hanleCheck = (Id_address, indexProduct) => {
    const data = delivery.map((i, x) => {
      if (x === indexProduct) {
        setactive(true);
        return { ...i, checked: true };
      } else {
        return { ...i, checked: false };
      }
    });
    setdelivery(data);
  };
  const BuyKonfirmasi = () => {
    const konfirm = delivery.filter((i, x) => i.checked === true);
    navigation("/Konfirmasi", { state: konfirm });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card" style={{ width: "70%" }}>
        <div
          className="card-header"
          style={{ border: "none", borderRadius: 0 }}
        >
          Checkout
        </div>
        <div style={{ padding: 20 }}>
          {active ? <h4>1 item selcted</h4> : <h4>Pilih Alamat Pengiriman</h4>}
          <table className="table  ">
            <thead>
              <tr>
                <th scope="col" className="" />
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
              </tr>
            </thead>
            {delivery.map((item, index) => {
              return (
                <>
                  <Table
                    item={item}
                    key={index}
                    hanleCheck={() => hanleCheck(item._id, index)}
                    checked={item.checked}
                  />
                  {/* <tbody key={index}>
                    <tr>
                      <th scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckChecked_${item._id}`}
                            checked={item.checked}
                            onChange={() => hanleCheck(item._id, index)}
                          />
                        </div>
                      </th>
                      <td>{item.nama}</td>
                      <td style={{ width: "60%" }}>
                        {item.propinsi} {item.kabupaten} {item.kecamatan}{" "}
                        {item.kelurahan} {item.detail}
                      </td>
                    </tr>
                  </tbody> */}
                </>
              );
            })}
          </table>
          {active && (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                style={{
                  borderRadius: 3,
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  height: 30,
                }}
                onClick={BuyKonfirmasi}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
