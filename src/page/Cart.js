import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Offcanvas, Card, ListGroup, Modal, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { parse } from '@fortawesome/fontawesome-svg-core';



const PersonalInfoForm = ({ formData, setFormData, user }) => {
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! Implement your submission logic here.');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={9}>
                    <Form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
                        <h2 style={{ paddingBottom: "15px", marginBottom: "20px ", fontWeight: "bold" }}>Contact Info</h2>
                        <Form.Group className="mb-3">
                            {user?.username === '' && (
                                <Alert variant='primary'>
                                    Log in to automatically fill in customer information
                                    <Button variant="primary" style={{ marginLeft: '10%' }} onClick={() => { navigate('/login') }}>
                                        Log in
                                    </Button>
                                </Alert>
                            )}
                            <Form.Label style={{ fontSize: "24px" }}>User name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} required style={{ marginBottom: "25px", fontSize: "19px" }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "24px" }}> Phone number<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="tel" placeholder="+84" name="phone" value={formData.phone} onChange={handleChange} required style={{ marginBottom: "25px", fontSize: "19px" }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "24px" }}>Email to receive booking information<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required style={{ marginBottom: "25px", fontSize: "19px" }} />
                        </Form.Group>
                        <Alert variant="success" className="mt-3" style={{ display: 'flex', fontSize: "24px", marginBottom: "25px" }}>
                            <div style={{ fontSize: '20px', color: 'green', position: 'relative', display: 'inline-block', width: '30%', height: '50px' }}>
                                <FontAwesomeIcon icon={faShield} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} />
                                <FontAwesomeIcon icon={faCheck} style={{ position: 'absolute', top: '25%', left: '40%', color: 'white' }} />
                            </div>
                            Phone number and email are used to send order information and contact when necessary.
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const TripDetails = ({ tickets, totalMoney, setTotalMoney }) => {

    const [error, setError] = useState(null);

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



    // Handle updating total from VoucherPoints component
    const handleUpdateTotal = (total) => {
        setTotalMoney(total);
    };
    function formatNumber(number) {
        return new Intl.NumberFormat('vi-VN').format(number);
    }
    return (
        <Container className="mt-4" style={{ marginTop: '60px' }}>
            <div className="card mb-3" style={{ marginBottom: '70px', width: "373px", fontSize: "20px" }}>
                Provisional <span style={{ fontWeight: 'bold' }}>{formatNumber(totalMoney * 1000)} VNĐ</span>
            </div>
            <VoucherPoints handleUpdateTotal={handleUpdateTotal} totalMoney={totalMoney} />
            {tickets.map(ticket => (
                <Card className="mb-3" key={ticket.ticket_id} style={{ maxWidth: '372px' }}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Col md={7} style={{ width: "190px", paddingLeft: "21px" }}>
                                <div>
                                    <p className="mb-1">
                                        <strong style={{ marginRight: "5px" }}>Date:</strong> {ticket.route ? formatDateTime(ticket.route.route_startTime) : 'No date available'}
                                    </p>
                                    <p><strong>Seat:</strong> {ticket.ticket_seat}</p>
                                </div>
                            </Col>
                            <Col md={3} style={{ width: "140px", paddingLeft: "22px" }}>
                                <Row>
                                    <Button style={{ width: "88px", margin: "10px 0px 0px 20px", height: "46px", paddingRight: "10px" }} variant="primary" onClick={() => handleShowDetails(ticket)}>Detail</Button>
                                </Row>
                                <Row><p style={{ marginTop: "17px", width: "60px", height: "1px" }}></p></Row>
                            </Col>
                        </div>
                        <div className="mb-4">
                            <h5 className="card-title">{ticket.route ? ticket.route.busCompany_fullname : 'No company'}</h5>
                        </div>
                        <div className="mb-4">
                            <Row>
                                <Col md={5} style={{ marginLeft: "20px", marginRight: "10px", width: "189px" }}>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {ticket.route ? `${ticket.route.startLocation.location_name} - ${ticket.route.endLocation.location_name}` : 'No route info'}
                                    </h6>
                                    <p className="card-text">
                                        {ticket.route ? ticket.route.busCompany.busCompany_location : 'No location'}
                                    </p>
                                </Col>
                                <Col md={4} style={{ paddingRight: "50px" }}><Button style={{ width: "90px", height: "46px" }} variant="success" onClick={() => handleShowChange(ticket)}>Changes</Button></Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            {/* Offcanvas for Details */}
            <Offcanvas show={showDetails} onHide={handleCloseDetails}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Show Detail</Offcanvas.Title>
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
                    <Offcanvas.Title style={{ fontSize: '20px' }}>Change</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedTicket && (
                        <>
                            <p style={{ fontSize: '20px' }}><strong>Date:</strong> {selectedTicket.route.route_startTime}</p>
                            <p style={{ fontSize: '20px' }}><strong>Seat:</strong> {selectedTicket.ticket_seat}</p>
                            <p style={{ fontSize: '20px' }}><strong>Company:</strong> {selectedTicket.route.busCompany_fullname}</p>
                            <p style={{ fontSize: '20px' }}><strong>Route:</strong> {selectedTicket.route.startLocation.location_name} - {selectedTicket.route.endLocation.location_name}</p>
                            <p style={{ fontSize: '20px' }}><strong>Location:</strong> {selectedTicket.route.busCompany.busCompany_location}</p>
                            {/* Add form elements or inputs here if you want to allow changes */}
                            <div className="form-group">
                                <label htmlFor="newSeat" style={{ fontSize: '20px' }}>New Seat</label>
                                <input type="text" className="form-control" id="newSeat" placeholder="Enter new seat number" style={{ fontSize: '20px' }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newDate" style={{ fontSize: '20px' }}>New Date</label>
                                <input type="date" className="form-control" id="newDate" style={{ fontSize: '20px' }} />
                            </div>
                            <Button variant="primary" onClick={() => alert('Changes saved!')} style={{ fontSize: '20px' }}>Save Changes</Button>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};
//nút tiếp tục
const ContinueComponent = ({ formData, isCheckout, totalMoney }) => {

    const navigate = useNavigate();

    const handleContinue = () => {
        sessionStorage.setItem("newTotalMoney", totalMoney);
        navigate('/payment'); // Adjust the path as needed
    };
    const isFormComplete = formData.name && formData.phone && formData.email;
    return (
        <Container fluid className="p-3 my-3 border rounded" style={{ bottom: 0, width: '100%' }}>
            <div className="text-center">
                {isCheckout ? (
                    <Row>
                        <Col md={2} style={{ paddingTop: "20px", paddingLeft: "70px" }}>
                            <Button variant="outline-secondary" style={{ width: "70%", height: '100%', backgroundColor: "#FFCC00", color: "black", fontWeight: "bold", paddingTop: "20px", paddingLeft: "70px" }} disabled={!isFormComplete} onClick={handleContinue}>Tiếp tục</Button>

                        </Col>
                        <Col md={2} style={{ paddingTop: "20px", paddingLeft: "80px" }}>
                            By pressing the Continue button, you agree to the <a href="/privacy-policy">Payment Privacy Policy</a> and <a href="/terms">Regulations</a>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col md={5}>
                            <Button variant="warning" style={{ width: '80%', marginTop: '10px' }} onClick={handleContinue}>Thanh toán</Button>
                        </Col>
                        <Col md={6} style={{ paddingTop: "20px", }}>
                            By pressing the Continue button, you agree to the <a href="/privacy-policy">Payment Privacy Policy</a> and <a href="/terms">Regulations</a>
                        </Col>
                    </Row>
                )}
                <div style={{ textAlign: "end", paddingRight: "50px", marginTop: "10px" }}>
                    You will soon receive the vehicle registration number, driver's phone number and easily change the pick-up and drop-off location after booking.
                </div>
            </div>
        </Container>
    );
};

// xữ lí list voucher ra bằng id bus company
const VoucherPoints = ({ handleUpdateTotal, totalMoney }) => {
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [points, setPoints] = useState(0); // Số điểm người dùng muốn sử dụng
    const [maxPoint, setMaxPoint] = useState(0); // Điểm tối đa mà người dùng có
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [informationUser, setInformationUser] = useState({});
    const [pointsApplied, setPointsApplied] = useState(false); // Trạng thái kiểm tra xem điểm đã được áp dụng hay chưa
    const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi nếu có

    const busCompany_id = JSON.parse(sessionStorage.getItem('bus_company_id'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const money = parseInt(sessionStorage.getItem("totalMoney") || '0');

    const handleShowVoucherModal = () => {
        setShowVoucherModal(true);
        handleUpdateTotal(money);
    };

    const handleCloseVoucherModal = () => setShowVoucherModal(false);

    // Lấy danh sách voucher
    useEffect(() => {
        fetch(`http://localhost:8080/buscompany/voucher/bus/${busCompany_id}`)
            .then(response => response.json())
            .then(data => setVouchers(data))
            .catch(error => console.error('Error fetching vouchers:', error));
    }, [busCompany_id]);

    // Lấy thông tin người dùng
    useEffect(() => {
        if (user == null) {
            return;
        }
        fetch(`http://localhost:8080/customer/get-cus?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                setInformationUser(data);
                setMaxPoint(data.point); // Giả định rằng 'point' là trường chứa điểm của người dùng
                // Kiểm tra trạng thái điểm trong session storage
                const storedPoints = parseInt(sessionStorage.getItem('appliedPoints') || '0');
                if (storedPoints > 0) {
                    setPoints(storedPoints);
                    setPointsApplied(true); // Đánh dấu điểm đã được áp dụng
                }
            })
            .catch(error => console.error('Error fetching user information:', error));
    }, [user]);

    const handleVoucherSelect = (voucher) => {
        setSelectedVoucher(voucher);
        const discountedTotal = totalMoney - (totalMoney * voucher.saleUp) / 100;
        handleUpdateTotal(discountedTotal);
        handleCloseVoucherModal();
    };

    const updateTotalAfterPoint = () => {
        if (pointsApplied) {
            alert('You can only apply points once.');
            return;
        }

        if (points > maxPoint) {
            alert('Your point balance is not sufficient.');
            return;
        }

        console.log("Saving applied points:", points);
        sessionStorage.setItem('appliedPoints', points.toString());

        setMaxPoint(maxPoint - points);
        const newTotal = totalMoney - points;
        handleUpdateTotal(newTotal);
        setPointsApplied(true);
    };

    const handlePointsChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) {
            setErrorMessage('Please enter a positive number.');
        } else if (value > maxPoint) {
            setErrorMessage(`The maximum number of points you can apply is ${maxPoint}.`);
        } else {
            setErrorMessage('');
            setPoints(value);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col style={{ height: "auto", paddingBottom: "20px", marginRight: "20px", width: "430px" }} md={12}>
                    <Card className="text-center mb-3">
                        <Card.Body style={{ padding: "10px" }}>
                            <Card.Title>Voucher</Card.Title>
                            <Card.Text style={{ fontSize: "20px" }}>{selectedVoucher ? `${selectedVoucher.voucher_code} - ${selectedVoucher.saleUp}%` : "No voucher selected"}</Card.Text>
                            <Button variant="primary" onClick={handleShowVoucherModal} style={{ marginBottom: "10px" }}>Voucher list</Button>
                        </Card.Body>
                        <Card.Body style={{ padding: "10px" }}>
                            <Card.Title>Points</Card.Title>
                            <Card.Text style={{ fontSize: "20px" }}>You have {maxPoint || 0} points</Card.Text>
                            <Form.Group className="mb-3" style={{ marginBottom: "10px" }}>
                                <Form.Label style={{ fontSize: "20px" }}>Enter the number of points you want to apply</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter points"
                                    onChange={handlePointsChange}
                                    min={0}
                                    max={maxPoint}
                                />
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <Button
                                    variant="primary"
                                    onClick={updateTotalAfterPoint}
                                    style={{ marginBottom: "10px" }}
                                    disabled={pointsApplied || errorMessage !== ''} // Disable button if points are applied or error exists
                                >
                                    Apply Discount
                                </Button>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showVoucherModal} onHide={handleCloseVoucherModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Voucher List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {vouchers?.map(voucher => (
                            <ListGroup.Item key={voucher.voucher_code} onClick={() => handleVoucherSelect(voucher)}>
                                {voucher.voucher_code}: Discount {voucher.saleUp}%
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVoucherModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

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


const Cart = () => {
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    const [formData, setFormData] = useState({ name: user.customer_fullname, phone: user.customer_phone, email: user.username });
    const [tickets, setTicket] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user == null) {
            navigate("/login")
        }
        const savedSeats = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const money = parseInt(sessionStorage.getItem("totalMoney") || '0');
        setTicket(savedSeats);
        setTotalMoney(money);
    }, []);


    return (
        <Container>
            <Row>
                <Col md={8}>
                    <PersonalInfoForm formData={formData} setFormData={setFormData} user={user} />
                </Col>
                <Col md={4}>
                    <TripDetails tickets={tickets} totalMoney={totalMoney} setTotalMoney={setTotalMoney} />
                </Col>
            </Row>
            <ContinueComponent formData={formData} totalMoney={totalMoney} />
        </Container>
    );
}

export default Cart;