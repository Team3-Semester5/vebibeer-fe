import React, { useState, useEffect } from "react";
import { Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

function BusPr({ onAdd, onHide }) {
  const [busCompany, setBusCompany] = useState({
    username: "",
    password: "",
    busCompany_status: "",
    busCompany_fullname: "",
    busCompany_dob: "",
    busCompany_imgUrl: "",
    busCompany_description: "",
    busCompany_nationally: "",
    busCompany_name: "",
    busCompany_contract: "",
    busCompany_location: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bus company data here if needed
    fetch("http://localhost:8080/api/buscompanies/1") // Replace 1 with the actual ID
      .then(response => response.json())
      .then(data => {
        setBusCompany(data);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching bus company:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusCompany({ ...busCompany, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/buscompanies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busCompany)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newBusCompany = await response.json();
      onAdd(newBusCompany);
      onHide();
    } catch (error) {
      setError(error.message);
      console.error('Error adding bus company:', error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Position (disabled)</label>
                        <Form.Control
                          defaultValue="Bus Company of Vebibeer"
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          name="username"
                          value={busCompany.username}
                          onChange={handleChange}
                          placeholder="Username"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Full Name</label>
                        <Form.Control
                          name="busCompany_fullname"
                          value={busCompany.busCompany_fullname}
                          onChange={handleChange}
                          placeholder="Full Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Date of Birth</label>
                        <Form.Control
                          name="busCompany_dob"
                          value={busCompany.busCompany_dob}
                          onChange={handleChange}
                          placeholder="Date of Birth"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Location</label>
                        <Form.Control
                          name="busCompany_location"
                          value={busCompany.busCompany_location}
                          onChange={handleChange}
                          placeholder="Location"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nationality</label>
                        <Form.Control
                          name="busCompany_nationally"
                          value={busCompany.busCompany_nationally}
                          onChange={handleChange}
                          placeholder="Nationality"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Company Name</label>
                        <Form.Control
                          name="busCompany_name"
                          value={busCompany.busCompany_name}
                          onChange={handleChange}
                          placeholder="Company Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          name="busCompany_description"
                          value={busCompany.busCompany_description}
                          onChange={handleChange}
                          cols="80"
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                {error && <p className="text-danger">{error}</p>}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                />
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={busCompany.busCompany_imgUrl || require("assets/img/faces/avt.jpg")}
                    />
                    <h5 className="title">{busCompany.busCompany_fullname}</h5>
                  </a>
                  <p className="description">{busCompany.username}</p>
                </div>
                <p className="description text-center">
                  {busCompany.busCompany_description}
                </p>
              </Card.Body>
              <hr />
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BusPr;