import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteBusCompanyModal = ({ show, onHide, busCompany, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/buscompanies/${busCompany.busCompany_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(busCompany.busCompany_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting bus company:', error);
        }
    };

    if (!busCompany) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Bus Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">Error: {error}</p>}
                <p>Are you sure you want to delete bus company <strong>{busCompany.busCompany_name}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Bus Company
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBusCompanyModal;