import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbarad from "../../component/ad_nav_footer/Navbarad.js";
import Footer from "../../component/buscompany_nav_footer/Footer.js";
import DataTable from "./DataTable.js";
import BusList from "./BusList.js";
import BusProfile from "./BusProfile.js";
import EditRating from "../busmanage/EditRating.js";


const AdLayout = () => {
  return (
    <div className="app">
      <Navbarad />
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route path="/" element={<DataTable />} />
            <Route path="dataTable" element={<DataTable />} />
            <Route path="listBus" element={<BusList />} />
            <Route path="busProfile" element={<BusProfile />} />
            <Route path="reviewRating" element={<EditRating/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdLayout;
