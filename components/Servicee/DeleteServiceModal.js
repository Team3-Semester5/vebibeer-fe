import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteServiceModal = ({ show, onHide, service, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/services/${service.service_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(service.service_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting service:', error);
        }
    };

    if (!service) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete service <strong>{service.service_name}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Service
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteServiceModal;