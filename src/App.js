import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import RouteGuestList from './page/RouteGuestList';
import Cart from './page/Cart';
import PaymentMethod from './page/PaymentMethod';
import All from './page/LoginRegister';
import OAuth2RedirectHandler from './utils/OAuth2RedirectHandler';
import ProfilePage from './page/CustomerProfilePage';
import OrderResult from './page/OrderResult';
import BusLayout from './page/busmanage/BusLayout';
import AdLayout from './page/Admanage/AdLayout';
import TransactionHistory from './page/TransactionHistory';
import ChangePassword from './page/ChangePassword';
import VerifyEmail from './page/Verify';
import VerifyChangePassword from './page/VerifyChangePassword';
import ForgetPassword from './page/ForgetPassword';
import AboutUss from './component/AboutUss';
// import AboutUss from './page/AboutUss'
// import BusLayout from "./page/BusCompanyManager/layouts/Bus";

function App() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route path="/routeGuest" element={<RouteGuestList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/login" element={<All />} />
        <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/payment-result' element={<OrderResult />} />
        <Route path='/bus/*' element={<BusLayout />} />
        <Route path='/ad/*' element={<AdLayout/>} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path='/inputEmail' element={<ForgetPassword/>} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/verify' element={<VerifyEmail/>} />
        <Route path='/verifyChangePassword' element={<VerifyChangePassword/>} />
        <Route path='/aboutus' element={<AboutUss/>} /> 
      </Routes>
    </Router>

  );
}

export default App;
