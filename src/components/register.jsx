import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Form.css";
import "./login.css";
import cover from "../static/gwoi.jpg";

const register = () => {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.paswd.value);
    formData.append("phone", e.target.pno.value);
    formData.append("name", e.target.name.value);

    axios
      .post("users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
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
            Register
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
            <div className="inp">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="test"
                id="name"
                style={{ width: "300px" }}
              />
            </div>
            <div className="inp">
              <label htmlFor="pno">Phone</label>
              <input
                name="pno"
                type="number"
                id="pno"
                style={{ width: "300px" }}
              />
            </div>

            <div className="sub">
              <input type="submit" className="btn" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
