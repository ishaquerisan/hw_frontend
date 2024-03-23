import React from "react";
import logos from "../Assets/image.png";
import facebook from "../Assets/facebook.png";
import twitter from "../Assets/twitter.png";
import instagram from "../Assets/instagram.png";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="log-ico">
          <div className="logo-hw">
            <img src={logos} alt="" />
            <h4>HERITAGE WORLD</h4>
          </div>
          <div className="footer-icons">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>

        <div className="contact">
          <h4>CONTACT US</h4>
          <p>Department of History</p>
          <p>+91 912345667807</p>
        </div>

        <div className="contact">
          <h4>ABOUT US</h4>
          <Link to='/about' style={{textDecoration:"none"}}><p>Details</p></Link>
        </div>
      </div>

      <div className="footer-btm">
        <div className="sponser">
          <p>Sponsored by <a href="https://icssr.org/">Indian Council of Social Science Research</a></p>
        </div>

        <div className="develop">
          <p>Developed by <a href="https://altezzai.com/">Altazzai</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
