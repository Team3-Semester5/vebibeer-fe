import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import BusNavbar from "components/Navbars/BusNavbar";
import Footer from "components/Footer/Footer";

import routes from "routes.js";

function Cus() {
  const location = useLocation();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cus") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <BusNavbar />
      <div className="content">
        <Switch>{getRoutes(routes)}</Switch>
      </div>
      <Footer />
    </>
  );
}

export default Cus;
