import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../component/buscompany_nav_footer/Footer.js"
import Navbar from "../../component/buscompany_nav_footer/Navbar.js"
import DataTable from "./DataTable.js";
import TripList from "./TripList.js";
import BusProfile from "./BusProfile.js";
import EditBus from "./EditBus.js";
import ProfileDriver from "./ProfileDriver.js";
import Location from "./Location.js";
import Service from "./Service.js";

const BusLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route path="/" element={<DataTable />} />
            <Route path="dataTable" element={<DataTable />} />
            <Route path="list" element={<TripList />} />
            <Route path="busProfile" element={<BusProfile />} />
            <Route path="editBus" element={<EditBus />} />
            <Route path="profileDriver" element={<ProfileDriver />} />
            <Route path="location" element={<Location />} />
            <Route path="service" element={<Service />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusLayout;
