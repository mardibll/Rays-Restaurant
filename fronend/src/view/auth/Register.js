import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { regist } from "../../servicesApi/auth";
import Input from "../../component/input";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigation=useNavigate()
  const [registUser, setregistUser] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setregistUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await regist(registUser);
      navigation("/Login")
    } catch (error) {
      console.log(error, "Gagal Regist !!!");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      <div className="card" style={{ width: "20%" }}>
        <div className="card-header">Register</div>
        <div style={{ padding: 20 }}>
          <label>Full Name</label>
          <div>
            <Input
              value={registUser.full_name}
              onChange={handleChange}
              name={"full_name"}
            />
          </div>
          <label>Alamat Email</label>
          <div>
            <Input
              value={registUser.email}
              onChange={handleChange}
              name={"email"}
            />
          </div>
          <label>Password</label>
          <div>
            <Input
              value={registUser.password}
              onChange={handleChange}
              name={"password"}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              border: "none",
              backgroundColor: "blue",
              marginTop: 15,
              borderRadius: 3,
              width: 80,
              color: "white",
              height: 30,
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
