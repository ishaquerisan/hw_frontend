import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.css";
import data from "../Assets/data.js";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    prevArrow: <div className="slick-prev"></div>,
    nextArrow: <div className="slick-next"></div>,
  };

  return (
    <div className="hero">
      <div className="image-slider">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={`Slide ${index}`} />

              <div className="black"></div>

              <div className="hero-heading">
                <h1>{item.head}</h1>
                <p>{item.para}</p>
              </div>

            </div>
          ))}
        </Slider>
      </div>
      <div className="discover">
      <Link to="/explore" style={{ textDecoration: "none" }}>
                  <button className="discover-btn">
                    DISCOVER
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </Link>
      </div>
    </div>
  );
};

export default Hero;
