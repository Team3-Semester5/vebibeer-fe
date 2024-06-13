import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteLocationModal = ({ show, onHide, location, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/locations/${location.location_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(location.location_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting location:', error);
        }
    };

    if (!location) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete location <strong>{location.location_name}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Location
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteLocationModal;