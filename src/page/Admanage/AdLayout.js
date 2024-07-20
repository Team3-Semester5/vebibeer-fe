import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbarad from "../../component/ad_nav_footer/Navbarad.js";
import Footer from "../../component/buscompany_nav_footer/Footer.js";
import DataTable from "./DataTable.js";


import BusCompanyList from "../busmanage/cpn/BusCompany/BusCompany.js";
import RouteList from "../busmanage/cpn/Route/RouteList.js";
import EditRoute from "../busmanage/EditRoute.js";
import EditRating from "./EditRating.js";



const AdLayout = () => {
  
  return (
    <div className="app">
      <Navbarad />
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route path="/" element={<DataTable />} />
            <Route path="dataTable" element={<DataTable />} />
            <Route path="triplist" element={<EditRoute/>} />
            
            <Route path="reviewRating" element={<EditRating/>} />
            <Route path="busCompany" element={<BusCompanyList/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdLayout;
