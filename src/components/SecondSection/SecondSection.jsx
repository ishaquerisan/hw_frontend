import React from 'react';
import './SecondSection.css';
import img1 from '../Assets/pexels-pixabay-208277.jpg';
import img2 from '../Assets/pexels-pixabay-218480.jpg';
import { Link } from 'react-router-dom';


const SecondSection = () => {

  const handleClick = () => {
    window.scrollTo(0,0);
  }

  return (
    <div className='second-section'>

      <div className="section-1">
          <div className="image-sec">
            <img className='sec-img' src={img2} alt="" />
          </div>
          <div className="details-sec">
            <h2>Miskhal Masjid</h2>
            <p>Mishkal Mosque is a medieval mosque located in Calicut on Malabar Coast, souther India. The mosque, one of the few surviving medeival mosques in Keerala, is regarded as an important cultural, historical and archtectural monument of Kerala</p>
            <Link to='/places/65f5c8c8de4a16e914e2f889'  style={{textDecoration: 'none'}}>
              <button onClick={() => handleClick()} className='more-btn'>More <span className="material-symbols-outlined">arrow_forward</span></button>
            </Link>
          </div>
      </div>

      <div className="section-2">
          <div className="details-sec">
            <h2>Miskhal Masjid</h2>
            <p>Mishkal Mosque is a medieval mosque located in Calicut on Malabar Coast, souther India. The mosque, one of the few surviving medeival mosques in Keerala, is regarded as an important cultural, historical and archtectural monument of Kerala</p>
            <Link to='/places/65f5ca98de4a16e914e2f89e' style={{textDecoration: 'none'}}>
              <button onClick={() => handleClick()} className='more-btn'>More <span className="material-symbols-outlined">arrow_forward</span></button>
            </Link>
          </div>
          <div className="image-sec">
            <img className='sec-img' src={img1} alt="" />
          </div>
      </div>
      
    </div>
  )
}

export default SecondSection;