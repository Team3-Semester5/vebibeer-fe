import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBusCompanyModal = ({ show, onHide, onAdd }) => {
  const [busCompany, setBusCompany] = useState({
    username: '',
    password: '',
    busCompany_status: '',
    busCompany_fullname: '',
    busCompany_dob: '',
    busCompany_description: '',
    busCompany_nationality: '',
    busCompany_name: '',
    busCompany_location: '',
    busCompany_contract: ''
  });
  const [file, setFile] = useState(null);
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
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(busCompany).forEach(key => {
        formData.append(key, busCompany[key]);
      });
      if (file) {
        formData.append('busCompany_imgUrl', file);
      }

      const response = await fetch('http://localhost:8080/api/buscompanies/', {
        method: 'POST',
        body: formData
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
        <Form onSubmit={handleSubmit}>
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
            {previewImage && (
              <img
                src={previewImage}
                alt="Avatar Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
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
              name="busCompany_nationality"
              value={busCompany.busCompany_nationality}
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
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_location"
              value={busCompany.busCompany_location}
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
          {error && <p className="text-danger">Error: {error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add Bus Company
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBusCompanyModal;