import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/namepage.png"; // Make sure to replace this path with the actual path to your logo image

import "../../assets/css/Navbar.css"; // Import the CSS file
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <a href="http://localhost:3000/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <ul>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="dataTable">Data Table</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="route">Trip List</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="busProfile">Bus Profile</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="editBus">Edit Bus</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="profileDriver">Profile Driver</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="location">Location</Link>
        </li>
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="service">Service</Link>
        </li>
        {/* <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="reviewrating">Review Rating</Link>
        </li> */}
        <li style={{ marginLeft: "1rem", marginTop: "20px" }}>
          <Link to="informationCustomer">Customer</Link>
        </li>
        <li
          style={{
            marginLeft: "200px",
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          <button
            style={{
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff", // Màu xanh dương
              color: "white", // Màu chữ trắng
              border: "none", // Bỏ viền
              borderRadius: "5px", // Bo góc
            }}
            onClick={() => {}}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar