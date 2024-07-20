import React from "react";
import "./SpecialOffer.css"; // Import the CSS for styling
import offershape from "../assets/images/offer/offer-shape.png";

const SpecialOffer = () => {
  return (
    <section id="spo" className="special-offer">
      <div className="container">
        <div className="special-offer-content">
          <div className="row">
            <div className="col-sm-8">
              <div className="form-wrapper">
                <div className="single-special-offer">
                  <div className="single-special-offer-txt">
                    <h2>Đà Nẵng</h2>
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
                        <span>
                          <i className="fa fa-angle-right"></i> 5 days 6 nights
                        </span>
                        <span>
                          <i className="fa fa-angle-right"></i> 2 persons
                        </span>
                        <span>
                          <i className="fa fa-angle-right"></i> 5 star
                          accommodation
                        </span>
                      </p>
                      <p>
                        <span>
                          <i className="fa fa-angle-right"></i> transportation
                        </span>
                        <span>
                          <i className="fa fa-angle-right"></i> food facilities
                        </span>
                      </p>
                      <p className="offer-para">
                        Discover the wonders of Da Nang, where stunning natural
                        landscapes meet a vibrant culinary scene. From its
                        pristine beaches and majestic mountains to its rich
                        cultural heritage and bustling markets, Da Nang offers
                        an unforgettable travel experience. Whether you're
                        seeking adventure or relaxation, this coastal gem has
                        something for everyone.
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
            </div>
            <div className="col-sm-4">
              <div className="single-special-offer">
                <div className="single-special-offer-bg">
                  <img
                    style={{ marginRight: "50px" }}
                    src={offershape}
                    alt="offer-shape"
                  />
                </div>
                <div className="single-special-shape-txt">
                  <h3 style={{ marginRight: "50px", marginLeft: "47px" }}>
                    special offer
                  </h3>
                  <br />
                  <h4>
                    <span>40%</span>
                    <br />
                    off
                  </h4>
                  <p style={{ marginBottom: "50px" }}>
                    <span>$999</span>
                    <br />
                    regular $1450
                  </p>
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
