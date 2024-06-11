import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import RouteGuestList from './page/RouteGuestList';
import Cart from './page/Cart';
import PaymentMethod from './page/PaymentMethod';
import All from './page/LoginRegister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/routeGuest" element={<RouteGuestList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/login" element={<All/>} />
      </Routes>
    </Router>

  );
}

export default App;
