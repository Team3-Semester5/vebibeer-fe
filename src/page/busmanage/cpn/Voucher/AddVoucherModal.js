import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddVoucherModal = ({ show, onHide, onAdd }) => {
    const [voucher, setVoucher] = useState({
        voucher_code: '',
        saleUp: '',
        startTime: '',
        endTime: '',
        voucher_condition: '',
        busCompany_id: 1 // This is hardcoded as you requested.
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher({ ...voucher, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/buscompany/voucher/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voucher)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newVoucher = await response.json();
            onAdd(newVoucher);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding voucher:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Voucher Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter voucher code"
                            name="voucher_code"
                            value={voucher.voucher_code || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter discount percentage"
                            name="saleUp"
                            value={voucher.saleUp || ''}
                            onChange={handleChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="startTime"
                            value={voucher.startTime|| ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="endTime"
                            value={voucher.endTime || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Voucher Conditions</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Describe conditions"
                            name="voucher_condition"
                            value={voucher.voucher_condition || ''}
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
                    Add Voucher
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

AddVoucherModal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default AddVoucherModal;