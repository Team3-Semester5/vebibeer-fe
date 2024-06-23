import React from "react";
import PackageCard from "./PackageCard";
import "./SpecialPackages.css"; // Custom CSS for layout and styling

const SpecialPackages = () => {
  const packages = [
    {
      id: 1,
      destination: "Nha Trang",
      price: 499,
      daysNights: "4 Days 3 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2544",
      imageSrc:
        "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/01/26/anh-nha-trang-dep-moi-nhat-1-1544.jpeg",
    },
    {
      id: 2,
      destination: "Đà Lạt",
      price: 1499,
      daysNights: "5 Days 4 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2240",
      imageSrc:
        "https://i0.wp.com/media.techcity.cloud/vietnam.vn/2023/05/anh-dep-da-lat_085717278-9.jpg?fit=1000%2C683&ssl=1",
    },
    {
      id: 3,
      destination: "Hà Nội ",
      price: 1199,
      daysNights: "5 Days 5 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2544",
      imageSrc:
        "https://cdn-images.vtv.vn/thumb_w/650/Uploaded/lanchi/2013_09_19/5.8_ava.jpg",
    },
    {
      id: 1,
      destination: "Đà Nẵng",
      price: 799,
      daysNights: "6 Days 6 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2782",
      imageSrc:
        "https://media.istockphoto.com/id/1357445596/vi/anh/c%E1%BA%A7u-r%E1%BB%93ng-%E1%BB%9F-th%C3%A0nh-ph%E1%BB%91-%C4%91%C3%A0-n%E1%BA%B5ng.jpg?s=612x612&w=0&k=20&c=H_3uhMhNr1kZvg78iOtTROncLKwbsYrffBAEIPpGX2g=",
    },
    {
      id: 2,
      destination: "Phú Quốc",
      price: 1199,
      daysNights: "7 Days 7 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2544",
      imageSrc:
        "https://statics.vntrip.vn/data-v2/data-guide/img_content/1470302455_anh-14.jpg",
      imageStyle: {
        height: "900px", // Tăng chiều cao của ảnh
      },
    },
    {
      id: 3,
      destination: "Quảng Bình",
      price: 940,
      daysNights: "6 Days 6 Nights",
      accommodation: "5 Star Accommodation",
      transportation: "Transportation",
      foodFacilities: "Food Facilities",
      reviews: "2858",
      imageSrc: "https://btnmt.1cdn.vn/thumbs/900x600/2023/06/15/1.jpg",
    },
  ];

  return (
    <section className="packages">
      <div className="container">
        <div className="gallery-header text-center">
          <h2>Special Packages</h2>
          <p>
            Enjoy exclusive deals and discounts on our special packages designed
            just for you. Don't miss out on these limited-time offers!
          </p>
        </div>
        <div className="packages-content">
          <div className="row">
            {packages.map((pkg) => (
              <div key={pkg.id} className="col-md-4 col-sm-6">
                <PackageCard {...pkg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialPackages;
