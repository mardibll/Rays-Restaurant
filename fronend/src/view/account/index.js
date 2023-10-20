import React, { useEffect, useState } from "react";
import Profile from "./profile";
import Address from "./address";
import Invoice from "../invoice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/actionAuth";
export default function Account() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authtoken.token);
  const navigation = useNavigate();
  const [activemenu, setactivemenu] = useState("profile");
  const [menuActive, setmenuActive] = useState([
    {
      name: "profile",
      active: true,
    },
    {
      name: "pemesanan",
      active: false,
    },
    {
      name: "alamat",
      active: false,
    },
    {
      name: "logout",
      active: false,
    },
  ]);

  const menuFilter = async (names) => {
    if (names === "logout") {
      try {
        dispatch(logout(authToken));
        navigation("/");
      } catch (error) {}
    }
    const newdata = menuActive.map((i, x) => {
      if (names === i.name) {
        setactivemenu(names);
        return { ...i, active: true };
      } else {
        return { ...i, active: false };
      }
    });
    setmenuActive(newdata);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card" style={{ width: "70%", marginTop: 70 }}>
        <div className="card-header">Account</div>
        <div className="row g-0 ">
          <div className="col-6 col-md-3" style={{}}>
            <div className="list-group" style={{ margin: 15 }}>
              {menuActive.map((item, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    className="list-group-item list-group-item-action hover"
                    aria-current="true"
                    onClick={() => menuFilter(item.name, index)}
                    style={{
                      backgroundColor: item.active ? "blue" : "white",
                      color: item.active ? "white" : "black",
                    }}
                  >
                    {item?.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-sm-6 col-md-9 " style={{ padding: 15 }}>
            {activemenu === "profile" && <Profile />}
            {activemenu === "pemesanan" && <Invoice />}
            {activemenu === "alamat" && <Address />}
          </div>
        </div>
      </div>
    </div>
  );
}
