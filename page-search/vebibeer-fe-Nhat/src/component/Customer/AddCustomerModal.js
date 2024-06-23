import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCustomerModal = ({ show, onHide, onAdd }) => {
  const [customer, setCustomer] = useState({
    customer_fullname: '',
    customer_id: '',
    username: '',
    password: '',
    customer_status: '',
    customer_fullname: '',
    customer_dob: '',
    customer_img_ava: '',
    customer_nationality: '',
    customer_gender: '',
    customer_description: '',
    verify_purchased: false,
    point: 0,
    typeCustomer: {
      typeCustomer_id: 1,
      typeCustomer_name: "normal",
      typeCustomer_description: "khách mua 10 vé trở xuống"
    }
  });
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/customer/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onAdd(customer);
      onHide();
    } catch (error) {
      setError(error.message);
      console.error('Error adding customer:', error);
    }

  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCustomerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="customer_fullname"
              value={customer.customer_fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="customer_status"
              value={customer.customer_status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="customer_description"
              value={customer.customer_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerDob">
            <Form.Label>Dob</Form.Label>
            <Form.Control
              type="date"
              name="customer_dob"
              value={customer.customer_dob}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="customer_gender"
              value={customer.customer_gender}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerNationality">
            <Form.Label>nationality</Form.Label>
            <Form.Control
              type="text"
              name="customer_nationality"
              value={customer.customer_nationality}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCustomerImgAva">
            <Form.Label>Img</Form.Label>
            <Form.Control
              type="text"
              name="customer_img_ava"
              value={customer.customer_img_ava}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Customer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCustomerModal;