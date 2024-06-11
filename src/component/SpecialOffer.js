import React from 'react';
import './SpecialOffer.css'; // Import the CSS for styling
import offershape from "../assets/images/offer/offer-shape.png";

const SpecialOffer = () => {
  return (
    <section id="spo" className="special-offer">
      <div className="container">
        <div className="special-offer-content">
          <div className="row">
            <div className="col-sm-8">
              <div className="single-special-offer">
                <div className="single-special-offer-txt">
                  <h2>Thailand</h2>
                  <div className="packages-review special-offer-review">
                    <p>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <span>2544 reviews</span>
                    </p>
                  </div>
                  <div className="packages-para special-offer-para">
                    <p>
                      <span><i className="fa fa-angle-right"></i> 5 days 6 nights</span>
                      <span><i className="fa fa-angle-right"></i> 2 persons</span>
                      <span><i className="fa fa-angle-right"></i> 5 star accommodation</span>
                    </p>
                    <p>
                      <span><i className="fa fa-angle-right"></i> transportation</span>
                      <span><i className="fa fa-angle-right"></i> food facilities</span>
                    </p>
                    <p className="offer-para">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                  <div className="offer-btn-group">
                    <div className="about-btn">
                      <button className="about-view packages-btn offfer-btn">
                        make tour
                      </button>
                    </div>
                    <div className="about-btn">
                      <button className="about-view packages-btn">
                        book now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="single-special-offer">
                <div className="single-special-offer-bg">
                  <img src={offershape} alt="offer-shape" />
                </div>
                <div className="single-special-shape-txt">
                  <h3>special offer</h3>
                  <h4><span>40%</span><br />off</h4>
                  <p><span>$999</span><br />regular $1450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;