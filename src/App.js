import './App.css';
import Menu from './component/Menu';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './component/Footer';
import Home from './page/Home';
import RouteGuestList from './page/RouteGuestList';


function App() {
  return (
    <>
        <Menu />
        <RouteGuestList />

      <Footer />
    </>
  );
}

export default App;
