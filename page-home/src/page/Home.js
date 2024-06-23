import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUs from "../component/AboutUs";
import Features from "../component/Features";
import Gallery from "../component/Gallery";
import DiscountOffer from "../component/DiscountOffer";
import SpecialPackages from "../component/SpecialPackages";
import Testimonial from "../component/Testimonial";
import SpecialOffer from "../component/SpecialOffer";

import Subscribe from "../component/Subscribe";
import Footer from "../component/Footer";
import Menu from "../component/Menu";

const Home = () => {
  return (
    <div>
      <Menu />
      <AboutUs />
      <Features />
      <Gallery />
      <DiscountOffer />
      <SpecialPackages />
      <Testimonial />
      <SpecialOffer />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
