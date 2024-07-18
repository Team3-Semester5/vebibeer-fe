import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_URL, API_URL1 } from '../../../../constaint/fetchApi';

const DeleteRouteModal = ({ show, onHide, route, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/route/buscomapany/delete/${route.route_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(route.route_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting route:', error);
        }
    };

    if (!route) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete route <strong>{route.route_description}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Route
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteRouteModal;