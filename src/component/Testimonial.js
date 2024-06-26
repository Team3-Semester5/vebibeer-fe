import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaQuoteLeft } from "react-icons/fa";
import "./Testimonial.css"; // Ensure you have this CSS file for additional styles

const testimonials = [
  {
    id: 1,
    quote:
      "Chuyến đi đến Hạ Long thật tuyệt vời. Cảnh quan thiên nhiên hùng vĩ và các hoạt động trên vịnh rất thú vị. Tôi rất hài lòng với dịch vụ xe khách, xe sạch sẽ và tài xế rất thân thiện.",
    name: "Nguyễn Thị Lan",
    location: "Hạ Long, Việt Nam",
    imgSrc:
      "https://cdn.vn.alongwalk.info/wp-content/uploads/2023/04/02030503/image-101-hinh-anh-ha-long-nen-tho-huu-tinh-khien-ban-phai-ngat-ngay-168035430373418.jpg",
  },
  {
    id: 2,
    quote:
      "Khám phá Hội An là một trải nghiệm không thể nào quên. Phố cổ đẹp lung linh vào buổi tối và ẩm thực địa phương rất ngon. Dịch vụ xe khách rất tốt, chuyến đi suôn sẻ và thoải mái.",
    name: "Trần Văn Minh",
    location: "Hội An, Việt Nam",
    imgSrc:
      "https://toquoc.mediacdn.vn/thumb_w/640/280518851207290880/2023/9/13/318486b4-c187-40b5-9220-1afe6e4ccf5eb99d0408-1694595766050422505578.jpg",
  },
  {
    id: 3,
    quote:
      "Kỳ nghỉ ở Đà Lạt thật thư giãn. Khí hậu mát mẻ và phong cảnh núi rừng rất đẹp. Xe khách đưa đón đúng giờ và rất an toàn. Chúng tôi rất thích các địa điểm du lịch như Thung Lũng Tình Yêu",
    name: "Lê Thị Hồng",
    location: "Đà Lạt, Việt Nam",
    imgSrc: "https://static.vinwonders.com/production/canh-dep-da-lat-2.jpg",
  },
  {
    id: 4,
    quote:
      "Chuyến đi đến Phú Quốc thật đáng nhớ. Bãi biển trong xanh và resort 5 sao rất tiện nghi. Dịch vụ xe khách rất tốt, hành trình thoải mái và tài xế chuyên nghiệp.",
    name: "Phạm Quốc Anh",
    location: "Phú Quốc, Việt Nam",
    imgSrc:
      "https://i1-dulich.vnecdn.net/2022/04/08/du-lich-Phu-Quoc-03-1254-1649405349.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=L3hmY-ilsuGlFWPrVQF4Gg",
  },
  {
    id: 5,
    quote:
      "Khám phá Sapa là một trải nghiệm đầy thú vị. Chúng tôi đã tham gia các tour trekking và ngắm cảnh đẹp tuyệt vời của ruộng bậc thang. Dịch vụ xe khách đưa đón chu đáo và an toàn.",
    name: "Hoàng Thu Hương",
    location: "Sapa, Việt Nam",
    imgSrc:
      "https://ik.imagekit.io/tvlk/blog/2023/06/cho-tinh-sapa-1024x576.jpeg?tr=dpr-2,w-675",
  },
  {
    id: 6,
    quote:
      "Chuyến du lịch đến Nha Trang thật tuyệt vời. Nha Trang thực sự là nơi lý tưởng cho  ai muốn thư giãn. Dịch vụ xe khách chất lượng cao, ghế ngồi thoải mái và điều hòa mát lạnh.",
    name: "Đỗ Thanh Tùng",
    location: "Nha Trang, Việt Nam",
    imgSrc: "https://och.vn/cms/wp-content/uploads/2021/03/3-1-1024x537.jpg",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="testimonial">
      <div className="container">
        <div className="gallary-header text-center">
          <h2 className="text-center">Clients Reviews</h2>
          <p className="text-center description">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        <OwlCarousel
          className="owl-carousel owl-theme"
          autoplay={true}
          dots={true}
        >
          {testimonials.map((testimonial) => (
            <div className="item home1-testm" key={testimonial.id}>
              <div className="home1-testm-single text-center">
                <div className="home1-testm-img">
                  <img src={testimonial.imgSrc} alt="testimonial" />
                </div>
                <div className="home1-testm-txt">
                  <span className="icon section-icon">
                    <FaQuoteLeft />
                  </span>
                  <p>{testimonial.quote}</p>
                  <h3>
                    <a>{testimonial.name}</a>
                  </h3>
                  <h4>{testimonial.location}</h4>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
