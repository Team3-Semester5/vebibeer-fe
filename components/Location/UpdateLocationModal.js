import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateLocationModal = ({ show, onHide, location, onUpdate }) => {
    const [updatedLocation, setUpdatedLocation] = useState(location);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(location ? location.location_logo : '');

    useEffect(() => {
        setUpdatedLocation(location);
        setPreviewImage(location ? location.location_logo : '');
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedLocation({ ...updatedLocation, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedLocation({ ...updatedLocation, location_logo: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/locations/${updatedLocation.location_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLocation)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating location:', error);
        }
    };

    if (!updatedLocation) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLocationName">
                        <Form.Label>Location Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="location_name"
                            value={updatedLocation.location_name || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocationLogo">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name="location_logo"
                            onChange={handleFileChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Or enter image URL"
                            name="location_logo"
                            value={updatedLocation.location_logo}
                            onChange={handleChange}
                            style={{ marginTop: '10px' }}
                        />
                        {previewImage && <img src={previewImage} alt="Logo Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </Form.Group>
                    <Form.Group controlId="formLocationDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="location_description"
                            value={updatedLocation.location_description || ''}
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
                    Update Location
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateLocationModal;