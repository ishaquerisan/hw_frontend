import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Form.css";
import "./login.css";
import cover from "../static/taj.jpg";

const Login = () => {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.paswd.value);

    axios
      .post("users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data.auth) {
          const token = "Bearer " + res.data.token;
          localStorage.setItem("token", token);
          navigate("/manage/ListMonuments");
        } else {
          alert("Login Failed");
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.response?.data.message);
      });
  }
  return (
    <div className="con">
      <div className="cover">
        <img src={cover} alt="" />
      </div>
      <div className="formcon" style={{ width: "50vw" }}>
        <div className="formcard" style={{ width: "500px" }}>
          <div className="head" style={{ marginBottom: "20px" }}>
            Login
          </div>
          <form onSubmit={submit}>
            <div className="inp">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                id="email"
                style={{ width: "300px" }}
              />
            </div>

            <div className="inp">
              <label htmlFor="paswd">Password</label>
              <input
                name="paswd"
                type="password"
                id="paswd"
                style={{ width: "300px" }}
              />
            </div>

            <div className="sub">
              <input type="submit" className="btn" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
