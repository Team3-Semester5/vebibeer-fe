import React from 'react';
import './AboutUs.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './SearchBox';


function AboutUs() {
  return (
    <div className="banner-container">
      <div className="banner">
        <h1>Explore the Beauty of the Beautiful World</h1>
        <SearchBox/>
      </div>
      
    </div>
  );
};

export default AboutUs;