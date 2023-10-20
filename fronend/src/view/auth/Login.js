import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../../servicesApi/auth";
import Input from "../../component/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/actionAuth";

export default function Login() {
  const dispath = useDispatch();

  const navigation = useNavigate();
  const [loginUser, setloginUser] = useState({
    email: "admin@gmail.com",
    password: "Admin12$",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispath(doLogin(loginUser));
      // await login(loginUser);
      navigation("/");
    } catch (error) {}
  };
  const registAccount = () => {
    navigation("/Register");
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
        <div className="card-header">Login</div>
        <div style={{ padding: 20 }}>
          <label>Alamat Email</label>
          <div>
            <Input
              value={loginUser.email}
              onChange={handleChange}
              name={"email"}
            />
          </div>
          <label>Password</label>
          <div style={{ textAlign: "end" }}>
            <Input
              value={loginUser.password}
              onChange={handleChange}
              name={"password"}
            />
            <button style={{ border: 0, background: "none" }}>
              <h4
                style={{ margin: 0, color: "red", fontSize: 14, marginTop: 5 }}
                onClick={registAccount}
              >
                No Account?
              </h4>
            </button>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              border: "none",
              backgroundColor: "blue",

              borderRadius: 3,
              width: 80,
              color: "white",
              height: 30,
            }}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
}
