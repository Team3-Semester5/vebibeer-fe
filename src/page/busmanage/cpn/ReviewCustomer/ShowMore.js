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
                <Modal.Title>Chi Tiết Khách Hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Trạng Thái Giao Dịch:</strong> {customer.transactionStatus}</p>
                <p><strong>Giá Vé:</strong> {customer.ticketPrice}.000 VNĐ</p>
                <p><strong>Số Ghế:</strong> {customer.ticketSeat}</p>
                <p><strong>Tình Trạng Vé:</strong> {customer.ticketStatus}</p>
                <p><strong>Điểm Khởi Hành:</strong> {formatDateTime(customer.routeStartTime)}</p>
                <p><strong>Điểm Kết Thúc:</strong> {formatDateTime(customer.routeEndTime)}</p>
                <p><strong>Thời Gian Giao Dịch:</strong> {formatDateTime(customer.transactionTimeEdit)}</p>
                <p><strong>Phương Thức Thanh Toán:</strong> {customer.paymentMethodName}</p>

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