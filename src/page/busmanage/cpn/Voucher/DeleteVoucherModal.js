import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteVoucherModal = ({ show, onHide, voucher, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buscompany/voucher/delete/${voucher.voucher_code}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(voucher.voucherCode);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error deleting voucher:', error);
        }
    };

    if (!voucher) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the voucher with code <strong>{voucher.voucherCode}</strong>?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Voucher
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteVoucherModal;