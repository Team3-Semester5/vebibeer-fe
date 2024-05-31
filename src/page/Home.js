import React from 'react';
import AboutUs from '../component/AboutUs';
import Features from '../component/Features';
import Gallery from '../component/Gallery';
import DiscountOffer from '../component/DiscountOffer';
import SpecialPackages from '../component/SpecialPackages';
import Testimonial from '../component/Testimonial';
import SpecialOffer from '../component/SpecialOffer';
import Blog from '../component/Blog';
import Subscribe from '../component/Subscribe';

const Home = () => {
  return (
    <div>
      <AboutUs/>
      <Features/>
      <Gallery/>
      <DiscountOffer/>
      <SpecialPackages/>
      <Testimonial/>
      <SpecialOffer/>
      <Blog/>
      <Subscribe/>
    </div>
  )
}

export default Home
