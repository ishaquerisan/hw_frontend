import React from "react";
import "./Navbar.css";
import logo_new from "../Assets/image.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  let isNavOpen = false;
  function toggleNav() {
    const navMenu = document.querySelector(".nav-menu");
    const closeButton = document.querySelector(".menu-icons .fa-times");
    const menuButton = document.querySelector(".menu-icons .fa-bars");
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
          className="material-symbols-outlined fa-bars"
          style={{ color: "white" }}
        >
          menu
        </span>
        <span
          className="material-symbols-outlined fa-times"
          style={{ color: "white" }}
        >
          close
        </span>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to="/" className="navlink" onClick={closeBlock}>
            HOME
          </Link>
        </li>

        <li>

          <Link to="/about" className="navlink" onClick={closeBlock}>
        
            ABOUT US
          </Link>
        </li>
        <li>
          <Link to="/explore" className="navlink" onClick={closeBlock}>
            MONUMENTS
          </Link>
        </li>
        <li>
          {location.pathname.includes("/login") ? (
            <Link to="/register" className="navlink" onClick={closeBlock}>
              REGISTER
            </Link>
          ) : (
            <Link to="/login" className="navlink" onClick={closeBlock}>
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
