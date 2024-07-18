import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../../assets/css/Footer.css"; // Đường dẫn tới file CSS chứa định dạng footer

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="text-right">
              © {new Date().getFullYear()}{" "}
              <a href="#" style={{ color: "#007bff" }}>
                Vebibeer
              </a>{" "}
              made with love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
