import React, { useEffect, useState } from "react";
import { orders } from "../../servicesApi/invoice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceAll } from "../../redux/action/actionInvoice";

export default function Invoice() {
  const authToken = useSelector((state) => state.authtoken.token);
  const dataInvoice = useSelector((state) => state.invoice.data);
  const display = useDispatch();
  const navigation = useNavigate();
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    display(getInvoiceAll(authToken));
  }, [display]);
  useEffect(() => {
    orderItem();
  }, [dataInvoice]);
  const toggleOpen = (Id_order) => {
    const newsdata = Orders.map((i, x) => {
      if (i._id === Id_order) {
        return { ...i, detail: !i.detail };
      }
      return i;
    });
    setOrders(newsdata);
  };
  const orderItem = async () => {
    const newdata = dataInvoice?.map((i) => {
      let data = i.order_items.map((is) => {
        is["total"] = is.price * is.qty;
        return is;
      });
      const filter = data.reduce(
        (akumulasi, akumulator) => akumulasi + akumulator.total,
        0
      );
      i["Transaksi"] = filter;
      i["detail"] = false;
      delete i.delivery_address;
      return i;
    });
    setOrders(newdata);
  };
  const datail = (id) => {
    navigation("/DetailInvoice", { state: id });
  };
  return (
    <table className="table ">
      <thead>
        <tr>
          <th scope="col" />
          <th scope="col">Order ID</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Invoice</th>
        </tr>
      </thead>
      <tbody>
        {Orders.map((order, index) => {
          return (
            <React.Fragment key={index}>
              <tr>
                <td style={{ width: 50 }}>
                  <button
                    style={{ border: "none", background: "none" }}
                    onClick={() => toggleOpen(order._id, index)}
                  >
                    {order.detail ? (
                      <i className="bi bi-chevron-down" />
                    ) : (
                      <i className="bi bi-chevron-right" />
                    )}
                  </button>
                </td>
                <td style={{ verticalAlign: "middle", width: "30%" }}>
                  {order.id}
                </td>
                <td style={{ verticalAlign: "middle" }}>{order.Transaksi}</td>
                <td style={{ verticalAlign: "middle" }}>
                  {order.payment_status}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <button
                    style={{
                      backgroundColor: "green",
                      border: "none",
                      color: "white",
                      borderRadius: 5,
                      padding: "3px 10px",
                    }}
                    onClick={() => datail(order._id)}
                  >
                    Invoice
                  </button>
                </td>
              </tr>
              {order.detail && (
                <tr key={`details-${order.orderId}`}>
                  <td colSpan="5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Barang</th>
                          <th>Jumlah</th>
                          <th>Harga</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_items.map((item, x) => (
                          <tr key={`item-${x}`}>
                            <td style={{ width: "40%" }}>{item.name}</td>
                            <td style={{ width: "25%" }}>{item.qty}</td>
                            <td style={{ width: "35%" }}>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
