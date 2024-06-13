import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddLocationModal = ({ show, onHide, onAdd }) => {
    const [location, setLocation] = useState({
        location_name: '',
        location_imgUrl: '',
        location_description: ''
    });
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocation({ ...location, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocation({ ...location, location_imgUrl: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/locations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(location)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newLocation = await response.json();
            onAdd(newLocation);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding location:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLocationName">
                        <Form.Label>Location Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="location_name"
                            value={location.location_name}
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
                            value={location.location_imgUrl}
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
                            value={location.location_description}
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
                    Add Location
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddLocationModal;