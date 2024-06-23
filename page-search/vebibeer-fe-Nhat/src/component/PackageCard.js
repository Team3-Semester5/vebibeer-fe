import React from 'react';
// import './PackageCard.css'; // Assuming you'll create a separate CSS file for styles

const PackageCard = ({ destination, price, daysNights, accommodation, transportation, foodFacilities, reviews, imageSrc }) => {
  return (
    <div className="single-package-item">
      <img src={imageSrc} alt={destination} />
      <div className="single-package-item-txt">
        <h3>{destination} <span className="pull-right">${price}</span></h3>
        <div className="packages-para">
          <p>
            <span>
              <i className="fa fa-angle-right"></i> {daysNights}
            </span>
            <i className="fa fa-angle-right"></i> {accommodation}
          </p>
          <p>
            <span>
              <i className="fa fa-angle-right"></i> {transportation}
            </span>
            <i className="fa fa-angle-right"></i> {foodFacilities}
           </p>
        </div>
        <div className="packages-review">
          <p>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <span>{reviews} reviews</span>
          </p>
        </div>
        <div className="about-btn">
          <button className="about-view packages-btn">
            book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;