import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteBusCompanyModal = ({ show, onHide, busCompany, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/buscompanies/${busCompany.buscompany_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(busCompany.buscompany_id);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting bus company:', error);
        }
    };

    if (!busCompany) return null;

    
};

export default DeleteBusCompanyModal;