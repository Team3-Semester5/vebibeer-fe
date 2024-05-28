import './App.css';
import Menu from './component/Menu';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './component/AboutUs';
import Features from './component/Features';
import Gallery from './component/Gallery';
import DiscountOffer from './component/DiscountOffer';
import SpecialPackages from './component/SpecialPackages';
import Testimonial from './component/Testimonial';
import SpecialOffer from './component/SpecialOffer';
import Blog from './component/Blog';
import Subscribe from './component/Subscribe';
import Footer from './component/Footer';


function App() {
  return (
    <>
      <Menu/>
      <AboutUs/>
      <Features/>
      <Gallery/>
      <DiscountOffer/>
      <SpecialPackages/>
      <Testimonial/>
      <SpecialOffer/>
      <Blog/>
      <Subscribe/>
      <Footer/>
    </>
  );
}

export default App;
