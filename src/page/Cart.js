import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Offcanvas, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PersonalInfoForm = ({ formData, setFormData, user }) => {
    let navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! Implement your submission logic here.');
    };

    return (

        <Container >
            <Row className="justify-content-md-center">
                <Col md={8}>

                    <Form onSubmit={handleSubmit}>
                        <h5>Thông tin liên hệ</h5>
                        <Form.Group className="mb-3">
                            {formData.name === '' && (
                                <Alert variant='primary'>
                                    Đăng nhập để tự động điền thông tin khách hàng
                                    <Button variant="primary" style={{ marginLeft: '10%' }} onClick={() => { navigate('/login') }}>
                                        Đăng nhập
                                    </Button>

                                </Alert>
                            )}

                            <Form.Label>Tên người dùng <span style={{ color: 'red' }}>*</span></Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="+84"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email để nhận thông tin đặt chỗ <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Alert variant="success" className="mt-3" style={{ display: 'flex' }}>
                            <div style={{
                                fontSize: '24px',
                                color: 'green',
                                position: 'relative',
                                display: 'inline-block',
                                width: '30%',
                                height: '50px'
                            }}>
                                <FontAwesomeIcon icon={faShield} style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0
                                }} />
                                <FontAwesomeIcon icon={faCheck} style={{
                                    position: 'absolute',
                                    top: '25%',
                                    left: '40%',
                                    color: 'white'
                                }} />
                            </div>
                            Số điện thoại và email được sử dụng để gửi thông tin đơn hàng và liên hệ khi cần thiết.
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

const TripDetails = () => {
    const [tickets, setTicket] = useState([]);
    const [error, setError] = useState(null);
    const [totalMoney, setTotalMoney] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);


    const handleShowDetails = (ticket) => {
        setSelectedTicket(ticket);
        setShowDetails(true);
    };

    const handleShowChange = (ticket) => {
        setSelectedTicket(ticket);
        setShowChange(true);
    };

    const handleCloseDetails = () => setShowDetails(false);
    const handleCloseChange = () => setShowChange(false);

    useEffect(() => {
        const savedSeats = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const money = parseInt(sessionStorage.getItem("totalMoney") || '0');
        setTicket(savedSeats);
        setTotalMoney(money);
    }, []);

    return (
        <Container className="mt-4">
            <div className="card mb-3">
                Tạm tính <span style={{ fontWeight: 'bold' }}>{totalMoney}</span>
            </div>
            {tickets.map(ticket => (
                <Card className="mb-3" key={ticket.ticket_id} style={{ maxWidth: '372px' }}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <p className="mb-1">
                                    <strong>Date:</strong>
                                    {ticket.route ? ticket.route.route_startTime : 'No date available'}
                                </p>
                                <p><strong>Seat:</strong> {ticket.ticket_seat}</p>
                            </div>
                            <Button variant="primary" onClick={() => handleShowDetails(ticket)}>Chi tiết</Button>
                        </div>
                        <div className="mb-4">
                            <h5 className="card-title">{ticket.route ? ticket.route.busCompany_fullname : 'No company'}</h5>
                        </div>
                        <div className="mb-4">
                            <h6 className="card-subtitle mb-2 text-muted">
                                {ticket.route ? `${ticket.route.startLocation.location_name} - ${ticket.route.endLocation.location_name}` : 'No route info'}
                            </h6>
                            <p className="card-text">
                                {ticket.route ? ticket.route.busCompany.busCompany_location : 'No location'}
                            </p>
                            <Button variant="success" onClick={() => handleShowChange(ticket)}>Thay đổi</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Offcanvas for Details */}
            <Offcanvas show={showDetails} onHide={handleCloseDetails}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chi tiết</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedTicket && (
                        <>
                            <p><strong>Date:</strong> {selectedTicket.route.route_startTime}</p>
                            <p><strong>Seat:</strong> {selectedTicket.ticket_seat}</p>
                            <p><strong>Company:</strong> {selectedTicket.route.busCompany_fullname}</p>
                            <p><strong>Route:</strong> {selectedTicket.route.startLocation.location_name} - {selectedTicket.route.endLocation.location_name}</p>
                            <p><strong>Location:</strong> {selectedTicket.route.busCompany.busCompany_location}</p>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            {/* Offcanvas for Change */}
            <Offcanvas show={showChange} onHide={handleCloseChange}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Thay đổi</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedTicket && (
                        <>
                            <p><strong>Date:</strong> {selectedTicket.route.route_startTime}</p>
                            <p><strong>Seat:</strong> {selectedTicket.ticket_seat}</p>
                            <p><strong>Company:</strong> {selectedTicket.route.busCompany_fullname}</p>
                            <p><strong>Route:</strong> {selectedTicket.route.startLocation.location_name} - {selectedTicket.route.endLocation.location_name}</p>
                            <p><strong>Location:</strong> {selectedTicket.route.busCompany.busCompany_location}</p>
                            {/* Add form elements or inputs here if you want to allow changes */}
                            <div className="form-group">
                                <label htmlFor="newSeat">New Seat</label>
                                <input type="text" className="form-control" id="newSeat" placeholder="Enter new seat number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newDate">New Date</label>
                                <input type="date" className="form-control" id="newDate" />
                            </div>
                            <Button variant="primary" onClick={() => alert('Changes saved!')}>Save Changes</Button>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );

}

const ContinueComponent = ({ formData }, isCheckout) => {
    const navigate = useNavigate();
    const handleContinue = () => {
        navigate('/payment'); // Adjust the path as needed
    };
    const isFormComplete = formData.name && formData.phone && formData.email;
    return (
        <Container fluid className="p-3 my-3 border rounded" style={{ bottom: 0, width: '100%' }}>
            <div className="text-center">
                {isCheckout ? (
                    <Row>
                        <Col md={6}>
                            <Button variant="outline-secondary" style={{ width: '80%', height: '100%' }} disabled={!isFormComplete} onClick={handleContinue} >Tiếp tục</Button>
                        </Col>
                        <Col md={6}>
                            Bằng việc nhấn nút Tiếp tục, bạn đồng ý với <a href="/privacy-policy">Chính sách bảo mật thanh toán</a> và <a href="/terms">Quy chế</a>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col md={6}>
                            <Button variant="warning" style={{ width: '80%', height: '100%' }} onClick={handleContinue} >Thanh toán</Button>
                        </Col>
                        <Col md={6}>
                            Bạn sẽ sớm nhận được biên số xe, số điện thoại tài xế và dễ dàng thay đổi điểm đón trả sau khi đặt.
                        </Col>
                    </Row>
                )}


                <div>
                    Bạn sẽ sớm nhận được biên số xe, số điện thoại tài xế và dễ dàng thay đổi điểm đón trả sau khi đặt.
                </div>
            </div>
        </Container>
    );
};



const Cart = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [formData, setFormData] = useState({
        name: user?. user.customer_fullname ?? '',
        phone: user?. user.customer_phone ?? '',
        email: user?. user.username ?? ''
    });

    

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <PersonalInfoForm formData={formData} setFormData={setFormData}/>
                </Col>
                <Col md={4}>
                    <TripDetails />
                </Col>
            </Row>
            <ContinueComponent formData={formData} />
        </Container>
    );
}

export default Cart
