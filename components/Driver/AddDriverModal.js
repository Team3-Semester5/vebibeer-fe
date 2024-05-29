import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddDriverModal = ({ show, onHide, onAdd }) => {
    const [driver, setDriver] = useState({
        driver_name: '',
        driver_ava: '',
        driver_description: ''
    });
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver({ ...driver, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDriver({ ...driver, driver_ava: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/drivers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driver)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newDriver = await response.json();
            onAdd(newDriver);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding driver:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDriverName">
                        <Form.Label>Driver Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="driver_name"
                            value={driver.driver_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDriverAva">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            name="driver_ava"
                            onChange={handleFileChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Or enter image URL"
                            name="driver_ava"
                            value={driver.driver_ava}
                            onChange={handleChange}
                            style={{ marginTop: '10px' }}
                        />
                        {previewImage && <img src={previewImage} alt="Avatar Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </Form.Group>
                    <Form.Group controlId="formDriverDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="driver_description"
                            value={driver.driver_description}
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
                    Add Driver
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDriverModal;