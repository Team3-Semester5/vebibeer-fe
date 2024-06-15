import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteDriverModal = ({ show, onHide, driver, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/drivers/${driver.driver_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(driver.driver_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting driver:', error);
        }
    };

    if (!driver) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete driver <strong>{driver.driver_name}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Driver
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDriverModal;