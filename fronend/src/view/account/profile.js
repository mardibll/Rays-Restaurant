import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAcount } from "../../redux/action/actionAuth";

export default function Profile() {
  const authToken = useSelector((state) => state.authtoken.token);
  const getUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAcount(authToken));
  }, [dispatch]);
  return (
    <div className="card" style={{ padding: 15 }}>
      <table className="table table-hover">
        <tbody>
          <tr>
            <th scope="row">Nama</th>
            <td>{getUser.full_name}</td>
          </tr>
          <tr style={{ border: "white" }}>
            <th scope="row">Email</th>
            <td>{getUser.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
