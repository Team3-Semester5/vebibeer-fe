import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Form, Container, Row, Col, Alert } from "react-bootstrap";
import "./busProfile.css";
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

function BusPr({ onAdd = () => {}, onHide = () => {} }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
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
  const [successMessage, setSuccessMessage] = useState(null); // Thêm state cho thông báo thành công
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null); // Thêm state cho thông báo upload thành công
  const fileInputRef = useRef(null); // Sử dụng React ref

  useEffect(() => {
    // Fetch bus company data here if needed
    fetch(`${API_URL}/admin/buscompanies/${user.busCompany_id}`) // Replace 1 with the actual ID
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${API_URL}/admin/buscompanies/upload/1`, { // Sử dụng ID thực của bus company
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedBusCompany = await response.json();
        setBusCompany({ ...busCompany, busCompany_imgUrl: updatedBusCompany.busCompany_imgUrl });
        setUploadSuccessMessage('Image uploaded successfully'); // Thay đổi trạng thái thông báo upload thành công
        setTimeout(() => setUploadSuccessMessage(null), 3000); // Ẩn thông báo sau 3 giây
      } catch (error) {
        setError('Error uploading image');
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/admin/buscompanies/update/1`, {
        method: "PUT",
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
      setSuccessMessage('Profile updated successfully'); // Thay đổi trạng thái thông báo thành công
      setTimeout(() => setSuccessMessage(null), 3000); // Ẩn thông báo sau 3 giây
    } catch (error) {
      setError(error.message);
      console.error('Error adding bus company:', error);
    }
  };

  return (
    <>
      <Container fluid style={{marginTop : 150}}>
        <Row >
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {uploadSuccessMessage && <Alert variant="success">{uploadSuccessMessage}</Alert>}
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
                          value={busCompany.username}
                          readOnly // Thêm thuộc tính readOnly
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
                          type="date"
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
                {/* <img
                  alt="..."
                  // src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                /> */}
              </div>
              <Card.Body>
                <div className="author">
                  
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={busCompany.busCompany_imgUrl || 'https://cdn.trendhunterstatic.com/thumbs/human-facebook-default-avatar.jpeg?auto=webp'} // Hiển thị ảnh đại diện
                      style={{ cursor: 'pointer' }} // Thêm con trỏ chuột chỉ vào ảnh
                      onClick={() => {
                        console.log("Image clicked"); // Thêm log để kiểm tra sự kiện click
                        if (fileInputRef.current) {
                          fileInputRef.current.click(); // Kích hoạt input chọn file khi click vào ảnh
                        }
                      }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef} // Sử dụng ref thay vì id
                      style={{ display: 'none' }} // Ẩn input chọn file
                      onChange={handleImageUpload} // Gọi hàm xử lý upload ảnh
                    />
                    <h5 className="title">{busCompany.busCompany_fullname}</h5>
                  
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
