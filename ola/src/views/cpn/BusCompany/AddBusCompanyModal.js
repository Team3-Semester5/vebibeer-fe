import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBusCompanyModal = ({ show, onHide, onAdd }) => {
  const [busCompany, setBusCompany] = useState({
    username: '',
    password: '',
    busCompany_status: '',
    busCompany_fullname: '',
    busCompany_dob: '',
    busCompany_imgUrl: '',
    busCompany_description: '',
    busCompany_nationally: '',
    busCompany_name: '',
    busCompany_contract: '',
    busCompany_location: ''
  });
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusCompany({ ...busCompany, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusCompany({ ...busCompany, busCompany_imgUrl: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/buscompanies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Bus Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={busCompany.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={busCompany.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_status"
              value={busCompany.busCompany_status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_fullname"
              value={busCompany.busCompany_fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="busCompany_dob"
              value={busCompany.busCompany_dob}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="busCompany_imgUrl"
              onChange={handleFileChange}
            />
            <Form.Control
              type="text"
              placeholder="Or enter image URL"
              name="busCompany_imgUrl"
              value={busCompany.busCompany_imgUrl}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            {previewImage && <img src={previewImage} alt="Avatar Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_description"
              value={busCompany.busCompany_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_nationally"
              value={busCompany.busCompany_nationally}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_name"
              value={busCompany.busCompany_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContract">
            <Form.Label>Contract</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_contract"
              value={busCompany.busCompany_contract}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_location"
              value={busCompany.busCompany_location}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        {error && <p className="text-danger">Error: {error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Bus Company
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBusCompanyModal;