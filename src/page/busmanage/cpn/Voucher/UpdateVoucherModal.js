import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateVoucherModal = ({ show, onHide, voucher, onUpdate }) => {
    const [updatedVoucher, setUpdatedVoucher] = useState(voucher);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (voucher) {
            setUpdatedVoucher(voucher);
        }
    }, [voucher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedVoucher(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buscompany/voucher/${updatedVoucher.voucher_code}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVoucher)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating voucher:', error);
        }
    };

    if (!updatedVoucher) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formVoucherCode">
                        <Form.Label>Voucher Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="voucherCode"
                            value={updatedVoucher.voucher_code || ''}
                            onChange={handleChange}
                            readOnly  // Typically you do not want to edit a primary key
                        />
                    </Form.Group>
                    <Form.Group controlId="formSaleUp">
                        <Form.Label>Sale Up</Form.Label>
                        <Form.Control
                            type="number"
                            name="saleUp"
                            value={updatedVoucher.saleUp || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="startTime"
                            value={updatedVoucher.startTime ? updatedVoucher.startTime.substring(0, 16) : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEndTime">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="endTime"
                            value={updatedVoucher.endTime ? updatedVoucher.endTime.substring(0, 16) : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formVoucherCondition">
                        <Form.Label>Condition</Form.Label>
                            <Form.Control
                            type="text"
                            name="voucherCondition"
                            value={updatedVoucher.voucher_condition     || ''}
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
                    Update Voucher
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateVoucherModal;