import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateBusCompanyModal = ({ show, onHide, busCompany, onUpdate }) => {
  const [updatedBusCompany, setUpdatedBusCompany] = useState(busCompany);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(busCompany ? busCompany.busCompany_imgUrl : '');

  useEffect(() => {
    setUpdatedBusCompany(busCompany);
    setPreviewImage(busCompany ? busCompany.busCompany_imgUrl : '');
  }, [busCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBusCompany({ ...updatedBusCompany, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedBusCompany({ ...updatedBusCompany, busCompany_imgUrl: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/buscompanies/${updatedBusCompany.busCompany_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBusCompany)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      onUpdate(updatedData);
      onHide();
    } catch (error) {
      setError(error.message);
      console.error('Error updating bus company:', error);
    }
  };

  if (!updatedBusCompany) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Bus Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={updatedBusCompany.username || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={updatedBusCompany.password || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_status"
              value={updatedBusCompany.busCompany_status || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_fullname"
              value={updatedBusCompany.busCompany_fullname || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="busCompany_dob"
              value={updatedBusCompany.busCompany_dob || ''}
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
              value={updatedBusCompany.busCompany_imgUrl || ''}
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
              value={updatedBusCompany.busCompany_description || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_nationality"
              value={updatedBusCompany.busCompany_nationality || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_name"
              value={updatedBusCompany.busCompany_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_location"
              value={updatedBusCompany.busCompany_location || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContract">
            <Form.Label>Contract</Form.Label>
            <Form.Control
              type="text"
              name="busCompany_contract"
              value={updatedBusCompany.busCompany_contract || ''}
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
          Update Bus Company
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBusCompanyModal;