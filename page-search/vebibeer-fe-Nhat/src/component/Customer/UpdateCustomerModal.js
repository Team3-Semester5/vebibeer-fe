import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCustomerModal = ({ show, onHide, customer, onUpdate }) => {
    const [updatedCustomer, setUpdatedCustomer] = useState(customer);
    const [error, setError] = useState(null);

    useEffect(() => {
        setUpdatedCustomer(customer);
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer({ ...updatedCustomer, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/customer/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCustomer)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onUpdate(updatedCustomer);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error update customer:', error);
        }
    };

    if (!updatedCustomer) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCustomerName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_fullname"
                            value={updatedCustomer.customer_fullname}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_status"
                            value={updatedCustomer.customer_status}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_description"
                            value={updatedCustomer.customer_description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerDob">
                        <Form.Label>Dob</Form.Label>
                        <Form.Control
                            type="date"
                            name="customer_dob"
                            value={updatedCustomer.customer_dob}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_gender"
                            value={updatedCustomer.customer_gender}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerNationality">
                        <Form.Label>nationality</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_nationality"
                            value={updatedCustomer.customer_nationality}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomerImgAva">
                        <Form.Label>Img</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_img_ava"
                            value={updatedCustomer.customer_img_ava}
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
                    Update Customer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateCustomerModal;