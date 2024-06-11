import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateServiceModal = ({ show, onHide, service, onUpdate }) => {
    const [updatedService, setUpdatedService] = useState(service);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(service ? service.service_logo : '');

    useEffect(() => {
        setUpdatedService(service);
        setPreviewImage(service ? service.service_logo : '');
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedService({ ...updatedService, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedService({ ...updatedService, service_logo: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/services/${updatedService.service_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedService)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating service:', error);
        }
    };

    if (!updatedService) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formServiceName">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="service_name"
                            value={updatedService.service_name || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formServiceDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="service_description"
                            value={updatedService.service_description || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formServiceLogo">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name="service_logo"
                            onChange={handleFileChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Or enter image URL"
                            name="service_logo"
                            value={updatedService.service_logo}
                            onChange={handleChange}
                            style={{ marginTop: '10px' }}
                        />
                        {previewImage && <img src={previewImage} alt="Logo Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update Service
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateServiceModal;