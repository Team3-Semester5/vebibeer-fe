import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../../constaint/fetchApi';

const DeleteCarModal = ({ show, onHide, car, onDelete }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/buscompany/car/update/${car.car_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...car, description: 'Ban' })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedCar = await response.json();
            onDelete(car.car_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating car description:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!car) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete car <strong>{car.car_code}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete Bus'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCarModal;
