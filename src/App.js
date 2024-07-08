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
// import BusLayout from "./page/BusCompanyManager/layouts/Bus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/routeGuest" element={<RouteGuestList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/login" element={<All/>} />
        <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/payment-result' element={<OrderResult/>} />
        <Route path='/bus/*' element={<BusLayout />} />
        <Route path='/ad/*' element={<AdLayout/>} />
        <Route path="/history" element={<TransactionHistory />} />
        {/* <Route path='/bus/dataTable' element={<BusLayout/>} /> */}
      </Routes>
    </Router>

  );
}

export default App;
