import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceByID } from "../../redux/action/actionInvoice";

export default function DetailInvoice() {
  const authToken = useSelector((state) => state.authtoken.token);
  const getInvoiceId = useSelector((state) => state.invoice.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const id = location.state;

  useEffect(() => {
    dispatch(getInvoiceByID(authToken, id));
  }, []);
  return (
    <div className="container" style={{ paddingTop: 100 }}>
      <div className="card" style={{}}>
        <div className="card-header">Account</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody style={{}}>
            <tr>
              <td>Status</td>
              <td>{getInvoiceId?.payment_status}</td>
            </tr>
            <tr>
              <td>Order ID</td>
              <td>{getInvoiceId?._id}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{getInvoiceId?.total}</td>
            </tr>
            <tr>
              <td>Billed to</td>
              <td style={{ width: "50%" }}>
                <div>
                  <h6 style={{ margin: 0 }}>
                    {" "}
                    {getInvoiceId?.user?.full_name}
                  </h6>
                  {getInvoiceId?.user?.email}
                </div>
                <div>
                  {getInvoiceId.delivery_address?.provinsi}{" "}
                  {getInvoiceId.delivery_address?.kabupaten}{" "}
                  {getInvoiceId.delivery_address?.kecamatan}{" "}
                  {getInvoiceId.delivery_address?.kelurahan}{" "}
                  {getInvoiceId.delivery_address?.detail}
                </div>
              </td>
            </tr>
            <tr>
              <td>Payment to</td>
              <td>
                Mardi migrasi
                <br />
                mardi@gmail.com
                <br />
                BCA
                <br />
                xxxxx-xxxxxx-333-34
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => navigation("/")}
          style={{
            backgroundColor: "grey",
            width: "100%",
            height: 50,
            color: "white",
            borderRadius: 5,
          }}
        >
          <h5>Selesai</h5>
        </button>
      </div>
    </div>
  );
}
