import React, { useState, useEffect } from "react";
import one from "../Assets/pexels-pixabay-290386.jpg";
import two from "../Assets/tajgate.jpg";
import three from "../Assets/tajmahal.jpg";
import "./LastSection.css";
import { Link } from "react-router-dom";
import axios from "axios";

const LastSection = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    axios
      .get("public/latest3")
      .then((response) => {
        setLatest(response.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }, []);

  return (
    <div className="last-section">
      <div className="page-head">
        <h3>Newly Addedd Places</h3>
      </div>
      <div className="image-container">
        {latest.map((item) => (
          <Link to={`/places/${item._id}`} className="image-con" key={item._id}>
            <img
              className="img-one"
              src={axios.defaults.baseURL + item.cover_image}
              alt=""
            />
            <div className="details">
              <div className="line"></div>
              <h2>{item.title}</h2>
              <p>
                {item.description.length > 300
                  ? item.description.slice(0, 300) + "....."
                  : item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="more-btn-div">
        <Link to="/explore" style={{ textDecoration: "none" }}>
          <button className="more-btn">
            More{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LastSection;
