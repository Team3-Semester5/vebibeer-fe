import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css";

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-details">
          <div className="gallery-header text-center">
            <h2>Top Destinations</h2>
            <p>
              Explore the top destinations with stunning landscapes and
              unforgettable experiences. We'll take you to the most amazing
              places you can't miss.
            </p>
          </div>
          <div className="gallery-box">
            <div className="gallery-content">
              <div className="filtr-container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="filtr-item">
                      <img
                        src="https://i2.ex-cdn.com/crystalbay.com/files/content/2024/01/26/anh-nha-trang-dep-moi-nhat-1-1544.jpeg"
                        alt="portfolio image"
                        style={{ height: "320px", width: "600px" }}
                      />
                      <div className="item-title">
                        <a href="#">Nha Trang</a>
                        <p>
                          <span>20 tours</span> <span>15 places</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="filtr-item">
                      <img
                        src="https://i1-dulich.vnecdn.net/2022/09/11/2-1662873807.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=vZhCVrK6zEwmp5U2ZLUicw"
                        alt="portfolio image"
                        style={{ height: "320px", width: "590px" }}
                      />
                      <div className="item-title">
                        <a href="#"> Đà Lạt </a>
                        <p>
                          <span>12 tours</span> <span>9 places</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="filtr-item">
                      <img
                        src="https://i.pinimg.com/564x/ad/dd/8e/addd8e3406337fc639034439e1d72201.jpg"
                        alt="portfolio image"
                        style={{ height: "670px" }}
                      />
                      <div className="item-title">
                        <a href="#">Hà Nội</a>
                        <p>
                          <span>25 tours</span> <span>10 places</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="filtr-item">
                          <img
                            src="https://owa.bestprice.vn/images/articles/uploads/nen-di-du-lich-da-nang-vao-thang-may-5eba6f68a8c61.jpg"
                            alt="portfolio image"
                            style={{ height: "320px", width: "500px" }}
                          />
                          <div className="item-title">
                            <a href="#"> Đà Nẵng</a>
                            <p>
                              <span>18 tours</span> <span>9 places</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="filtr-item">
                          <img
                            src="https://statics.vntrip.vn/data-v2/data-guide/img_content/1470302452_anh-5.jpg"
                            alt="portfolio image"
                            style={{ width: "370px", height: "320px" }}
                          />
                          <div className="item-title">
                            <a href="#"> Phú Quốc</a>
                            <p>
                              <span>14 tours</span> <span>12 places</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="filtr-item">
                        <img
                          src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-quang-binh-1.jpg?tr=dpr-2,w-675"
                          alt="portfolio image"
                          style={{ height: " 320px", width: " 810px" }}
                        />
                        <div className="item-title">
                          <a href="#">Quảng Bình</a>
                          <p>
                            <span>14 tours</span> <span>6 places</span>
                          </p>
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
