import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

const DeleteCustomerModal = ({ show, onHide, customer, onDelete }) => {
    const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
        const response = await fetch(`${API_URL}/customer/delete/`+customer.customer_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        onDelete(customer.customer_id);
        onHide();
    } catch (error) {
        setError(error.message);
        console.error('Error update customer:', error);
    }
  };

  if (!customer) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete customer <strong>{customer.customer_fullname}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Customer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomerModal;