import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import namepage from "assets/img/namepage.png";

import routes from "routes.js";

function Header() {
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            <img
              src={namepage}
              style={{ width: "130px", marginRight: "400px" }}
            />
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Nav className="nav mr-auto" navbar>
          <Nav.Item style={{ marginTop: "15px" }}>
            <Form
              style={{ marginRight: "20px", marginTop: "1000px" }}
              className="ml-3 my-lg-0"
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                style={{ width: "400px", height: "51px" }}
              />
            </Form>
          </Nav.Item>
          <Button style={{ paddingBottom: "10px" }} variant="outline-success">
            <i className="nc-icon nc-zoom-split"></i>
          </Button>
        </Nav>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span
                  style={{ fontSize: "40px", marginBottom: "10px" }}
                  className="nc-icon nc-circle-09"
                ></span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
