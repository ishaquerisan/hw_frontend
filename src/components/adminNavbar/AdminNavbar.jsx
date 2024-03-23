import React from "react";
import "./AdminNavbar.css";
import logo_new from "../Assets/image.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const adminNavbar = () => {
  let isNavOpen = false;
  const navigate = useNavigate();
  const location = useLocation();

  const logout = (e) => {
    localStorage.removeItem("token");
    if (location.pathname.includes("/manage/")) navigate("/login");
    else navigate(Window.location);
  };

  function toggleNav() {
    const navMenu = document.querySelector(".nav-menu");
    const closeButton = document.querySelector(".close-menu");
    const menuButton = document.querySelector(".bar-menu");
    console.log(isNavOpen);
    if (isNavOpen) {
      navMenu.classList.remove("nav-open");
      isNavOpen = false;
      closeButton.style.display = "none";
      menuButton.style.display = "block";
    } else {
      navMenu.classList.add("nav-open");
      isNavOpen = true;
      closeButton.style.display = "block";
      menuButton.style.display = "none";
    }
  }

  const closeBlock = () => {
    closeButton.style.display = "none";
    menuButton.style.display = "block";
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="nav-logo">
          <img src={logo_new} alt="" />
          <h1>HERITAGE WORLD</h1>
        </div>
      </Link>

      <div className="menu-icons" onClick={toggleNav}>
        <span
          className="material-symbols-outlined fa-bars bar-menu"
          style={{ color: "white" }}
        >
          menu
        </span>
        <span
          className="material-symbols-outlined fa-times close-menu"
          style={{ color: "white" }}
        >
          close
        </span>
      </div>

      <ul className="nav-menu">
        <li>
          <Link
            to="/manage/ListMonuments/"
            className="admin-navlink"
            onClick={closeBlock}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link to="/" className="admin-navlink">
            PUBLIC HOME
          </Link>
        </li>
        <li>
          <Link to="/explore" className="admin-navlink">
            MONUMENTS
          </Link>
        </li>
        <li>
          <div className="admin-navlink" onClick={logout}>
            LOGOUT
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default adminNavbar;
