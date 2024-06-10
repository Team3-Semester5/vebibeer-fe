import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCarModal = ({ show, onHide, car, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/cars/${car.car_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(car.car_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting car:', error);
        }
    };

    if (!car) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Bus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete car <strong>{car.car_code}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Bus
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCarModal;