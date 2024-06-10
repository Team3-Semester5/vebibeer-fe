import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBusCompanyModal = ({ show, onHide, onAdd }) => {
  const [busCompany, setBusCompany] = useState({
    username: '',
    password: '',
    buscompany_status: '',
    buscompany_fullname: '',
    buscompany_dob: '',
    buscompany_ava: '',
    buscompany_description: '',
    buscompany_nationality: '',
    buscompany_name: '',
    buscompany_location: '',
    buscompany_contract: ''
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
        setBusCompany({ ...busCompany, buscompany_ava: reader.result });
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
              name="buscompany_status"
              value={busCompany.buscompany_status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_fullname"
              value={busCompany.buscompany_fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="buscompany_dob"
              value={busCompany.buscompany_dob}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="buscompany_ava"
              onChange={handleFileChange}
            />
            <Form.Control
              type="text"
              placeholder="Or enter image URL"
              name="buscompany_ava"
              value={busCompany.buscompany_ava}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            {previewImage && <img src={previewImage} alt="Avatar Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_description"
              value={busCompany.buscompany_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_nationality"
              value={busCompany.buscompany_nationality}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_name"
              value={busCompany.buscompany_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_location"
              value={busCompany.buscompany_location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContract">
            <Form.Label>Contract</Form.Label>
            <Form.Control
              type="text"
              name="buscompany_contract"
              value={busCompany.buscompany_contract}
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