import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateDriverModal = ({ show, onHide, driver, onUpdate }) => {
    const [updatedDriver, setUpdatedDriver] = useState(driver);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(driver ? driver.driver_ava : '');

    useEffect(() => {
        setUpdatedDriver(driver);
        setPreviewImage(driver ? driver.driver_ava : '');
    }, [driver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDriver({ ...updatedDriver, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedDriver({ ...updatedDriver, driver_ava: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/drivers/${updatedDriver.driver_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDriver)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating driver:', error);
        }
    };

    if (!updatedDriver) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDriverName">
                        <Form.Label>Driver Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="driver_name"
                            value={updatedDriver.driver_name || ''}
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
                            value={updatedDriver.driver_ava}
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
                            value={updatedDriver.driver_description || ''}
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
                    Update Driver
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateDriverModal;