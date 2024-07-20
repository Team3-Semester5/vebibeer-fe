import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShowMore = ({ show, onHide, customer }) => {
    if (!customer) return null;
    const formatDateTime = (dateTimeString) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('vi-VN', options);
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Customer Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Transaction Status:</strong> {customer.transactionStatus}</p>
                <p><strong>Ticket Price:</strong> {customer.ticketPrice}.000 VND</p>
                <p><strong>Seat Number:</strong> {customer.ticketSeat}</p>
                <p><strong>Ticket Status:</strong> {customer.ticketStatus}</p>
                <p><strong>Departure Point:</strong> {formatDateTime(customer.routeStartTime)}</p>
                <p><strong>End Point:</strong> {formatDateTime(customer.routeEndTime)}</p>
                <p><strong>Transaction Time:</strong> {formatDateTime(customer.transactionTimeEdit)}</p>
                <p><strong>Payment Method:</strong> {customer.paymentMethodName}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowMore;