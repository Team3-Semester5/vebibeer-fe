import React from 'react';
import './AboutUs.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function AboutUs() {
  return (
    <div className="banner-container">
      <div className="banner">
        <h1>Explore the Beauty of the Beautiful World</h1>
        <button className="explore-button">EXPLORE NOW</button>
      </div>
      <div className="filter-box">
        <form className="filter-form">
        <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
            <input type="text" className="form-control" placeholder="Start Point" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
            <input type="text" className="form-control" placeholder="End Point" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
            <input type="date" className="form-control" placeholder="Check In" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-users"></i></span>
            <input type="number" className="form-control" placeholder="Members" />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;