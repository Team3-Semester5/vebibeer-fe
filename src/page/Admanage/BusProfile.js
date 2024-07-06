import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BusProfile({ onUpdate }) {
  const [busCompany, setBusCompany] = useState({
    username: "",
    password: "", // You might want to handle this securely, not shown here
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
      .then((response) => response.json())
      .then((data) => {
        setBusCompany(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching bus company:", error);
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
        method: "PUT", // Assuming you have a proper API endpoint for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busCompany),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedBusCompany = await response.json();
      onUpdate(updatedBusCompany);
    } catch (error) {
      setError(error.message);
      console.error("Error updating bus company:", error);
    }
  };

  return (
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
                      <Form.Label>Position (disabled)</Form.Label>
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
                      <Form.Label>Username</Form.Label>
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
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        defaultValue="contact@vebibeer.com" // Example email
                        placeholder="Email"
                        type="email"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
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
                      <Form.Label>Date of Birth</Form.Label>
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
                      <Form.Label>Location</Form.Label>
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
                      <Form.Label>Nationality</Form.Label>
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
                      <Form.Label>Company Name</Form.Label>
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
                      <Form.Label>About Me</Form.Label>
                      <Form.Control
                        name="busCompany_description"
                        value={busCompany.busCompany_description}
                        onChange={handleChange}
                        placeholder="Here can be your description"
                        as="textarea"
                        rows={4}
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
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={busCompany.busCompany_imgUrl}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                      marginLeft: "80px",
                    }}
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BusProfile;
