import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';
import img1 from "../assets/images/gallary/g1.jpg";
import img2 from "../assets/images/gallary/g2.jpg";
import img3 from "../assets/images/gallary/g3.jpg";
import img4 from "../assets/images/gallary/g4.jpg";
import img5 from "../assets/images/gallary/g5.jpg";
import img6 from "../assets/images/gallary/g6.jpg";


const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-details">
          <div className="gallery-header text-center">
            <h2>top destination</h2>
            <p>Duis aute irure dolor in velit esse cillum dolore eu fugiat nulla.</p>
          </div>
          <div className="gallery-box">
            <div className="gallery-content">
              <div className="filtr-container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="filtr-item">
                      <img src={img1} alt="portfolio image" />
                      <div className="item-title">
                        <a href="#">china</a>
                        <p><span>20 tours</span> <span>15 places</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="filtr-item">
                      <img src={img2} alt="portfolio image" />
                      <div className="item-title">
                        <a href="#">venuzuala</a>
                        <p><span>12 tours</span> <span>9 places</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-4">
                    <div className="filtr-item">
                      <img src={img3} alt="portfolio image" />
                      <div className="item-title">
                        <a href="#">brazil</a>
                        <p><span>25 tours</span> <span>10 places</span></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-8'>
                    <div className='row'>
                      <div className="col-md-6">
                        <div className="filtr-item">
                          <img src={img4} alt="portfolio image" />
                          <div className="item-title">
                            <a href="#">australia</a>
                            <p><span>18 tours</span> <span>9 places</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="filtr-item">
                          <img src={img5} alt="portfolio image" />
                          <div className="item-title">
                            <a href="#">netharland</a>
                            <p><span>14 tours</span> <span>12 places</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="filtr-item">
                        <img src={img6} alt="portfolio image" />
                        <div className="item-title">
                          <a href="#">turkey</a>
                          <p><span>14 tours</span> <span>6 places</span></p>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;