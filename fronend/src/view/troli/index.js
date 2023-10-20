import React, { useEffect, useState } from "react";
import { deleteTroli, troli } from "../../servicesApi/troli";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTroli,
  troliAll,
  updateTroli,
} from "../../redux/action/actionTroli";
export default function Troli({ setItemTroli }) {
  const dispatch = useDispatch();
  const selctors = useSelector((state) => state);
  const authToken = selctors.authtoken.token;
  const troli = selctors.troli;
  const navigation = useNavigate();
  const [productTroli, setproductTroli] = useState([]);
  const [totalHarga, settotalHarga] = useState(0);
  const [showData, setshowData] = useState(false);
  useEffect(() => {
    dispatch(troliAll(authToken));
  }, [setItemTroli, dispatch]);
  useEffect(() => {
    getTroli();
  }, [troli]);

  const getTroli = () => {
    if (troli.qty === 0) {
      setshowData(true);
    } else {
      const newdata = troli?.product.map((i) => {
        console.log(i);
        i["total"] = i.price * i.qty;
        i["checked"] = true;
        return i;
      });
      setItemTroli(newdata.length);
      const subtotal = newdata?.reduce(
        (akumulasi, currentValue) => akumulasi + currentValue.total,
        0
      );
      settotalHarga(subtotal);
      setproductTroli(newdata);
    }
  };

  const UpdateTroli = (action, id_product, jumlah) => {
    if (action === "DECREMENET") {
      const data = {
        items: [{ product: { _id: id_product }, qty: jumlah - 1 }],
      };
      dispatch(updateTroli(authToken, data));
    } else if (action === "INCREMENT") {
      const data = {
        items: [{ product: { _id: id_product }, qty: jumlah + 1 }],
      };
      dispatch(updateTroli(authToken, data));
    }
  };

  const filterTroli = (itemId) => {
    const updatedProductTroli = productTroli.map((item) => {
      if (item._id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setproductTroli(updatedProductTroli);
  };
  const checkout = () => {
    const getCheckedProducts = productTroli.filter(
      (item) => item.checked === true
    );
    console.log(getCheckedProducts);
    if (getCheckedProducts <= 0) {
      alert("Pilih Product Checkout");
    } else {
      localStorage.setItem("troli", JSON.stringify(getCheckedProducts));
      navigation("/Checkout");
    }
  };
  const trashCart = async (id_Cart) => {
    dispatch(removeTroli(authToken, id_Cart));
    dispatch(troliAll(authToken));
    getTroli();
  };
  return (
    <>
      {showData ? (
        <div className={styles.containerShow}>
          <img
            src={require("../../assets/cart.png")}
            style={{ height: 200, width: 300 }}
            alt="error"
          />
          <div style={{ width: "14%", textAlign: "center" }}>
            <h4 className={styles.teks1CartShow}>
              Keranjang belanjaan anda masih kosong
            </h4>
            <p className={styles.teks2CartShow}>
              ayo tambahkan produk kesukaan anda ke sini!
            </p>
            <button
              className={styles.btnCartShow}
              onClick={() => navigation("/")}
            >
              Cari Produk
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="card" style={{ width: "80%" }}>
            <div
              className="card-header"
              style={{ border: "none", borderRadius: 0 }}
            >
              Keranjang Belanja
            </div>
            <div style={{ padding: 20 }}>
              <h4>Sub Total: Rp {totalHarga}</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Gambar</th>
                    <th scope="col">Barang</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Qty</th>
                  </tr>
                </thead>
                {productTroli.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td scope="row">
                          <img
                            src={item.image_url}
                            alt="img"
                            style={{ height: 50, width: 60 }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.total}</td>
                        <td>
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() =>
                              UpdateTroli(
                                "DECREMENET",
                                item.product._id,
                                item.qty
                              )
                            }
                          >
                            -
                          </button>
                          {item.qty}
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() =>
                              UpdateTroli(
                                "INCREMENT",
                                item.product._id,
                                item.qty
                              )
                            }
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id={`flexCheckChecked_${item._id}`}
                              checked={item.checked}
                              onChange={() => filterTroli(item._id)}
                            />
                          </div>
                        </td>
                        <td>
                          <button onClick={() => trashCart(item._id)}>
                            <i
                              className="bi bi-trash3-fill"
                              style={{ color: "red", fontSize: 18 }}
                            />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div>
                <button className={styles.btnChackout} onClick={checkout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
