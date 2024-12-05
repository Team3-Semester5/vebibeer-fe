import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faQrcode, faBus, faCreditCard, faMoneyBill, faUniversity, faShieldAlt, faCalendarAlt, faUser, faTruck, } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import Menu from "../component/Menu";

const PaymentMethods = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleSelection = (method) => {
        setSelectedMethod(method);
    };

    const handlePayment = () => {
        if (selectedMethod === "cash") {
            alert("Đã nhận order");
        } else if (selectedMethod === "vnpay") {
            const amount = parseInt(sessionStorage.getItem('newTotalMoney'));
            const user = JSON.parse(sessionStorage.getItem("user"));
            let orderInfo = user.username + ";";
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            cart.forEach(ticket => {
                orderInfo = orderInfo + ticket.ticket_id + ",";
            });
            console.log(JSON.stringify({
                "amount": amount,
                "orderInfo": orderInfo
            }));
            alert(amount);
            const fetchPayment = async () => {
                try {
                    const response = await fetch('http://localhost:8080/cuong/submitOrder', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "amount": amount,
                            "orderInfo": orderInfo
                        })
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.redirectUrl) {
                        window.location.href = data.redirectUrl;
                    }
                } catch (error) {
                    setError(error.message);
                    console.error('Error adding customer:', error);
                }
            };
            fetchPayment();
        } else {
            alert("Please select a payment method.");
        }
    };

    return (
        <div style={{ backgroundColor: "#EEEEEE" }}>
            < Menu />
            <Container style={{ marginTop: "110px", marginBottom: "140px" }}>
                <Row>
                    <Col md={8} style={{ marginLeft: "89px" }}>
                        <div className="list-group">
                            <div className="list-group-item">
                                <h2>Phương thức thanh toán</h2>
                                <div className="list-group-item">
                                    <label className="d-flex align-items-start">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={selectedMethod === "cash"}
                                            onChange={() => handleSelection("cash")}
                                            className="mr-2"
                                            style={{ marginRight: "10px" }}
                                        />
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center mb-2">
                                                <FontAwesomeIcon
                                                    icon={faBus}
                                                    className="mr-2"
                                                    style={{ color: "#0099FF", marginRight: "10px" }}
                                                />
                                                Thanh toán khi lên xe
                                            </div>
                                            <p>Bạn có thể thanh toán cho tài xế khi lên xe</p>
                                        </div>
                                    </label>

                                </div>
                                <div className="list-group-item">
                                    <label className="d-flex align-items-start">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="vnpay"
                                            checked={selectedMethod === "vnpay"}
                                            onChange={() => handleSelection("vnpay")}
                                            className="mr-2"
                                            style={{ marginRight: "6px" }}
                                        />
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center mb-2">
                                                <img
                                                    src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg"
                                                    alt="vnpay"
                                                    style={{ marginRight: "5px" }}
                                                    className="mr-20"
                                                    width="30"
                                                />
                                                Thanh toán VNPAY-QR
                                            </div>
                                            <p>
                                                Thiết bị cần cài đặt Ứng dụng ngân hàng (Mobile Banking)
                                                hoặc Ví VNPAY
                                            </p>
                                        </div>
                                    </label>

                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <Container fluid className="p-3 my-3 border rounded" style={{ bottom: 0, width: '100%' }}>
                <div className="text-center">
                    <Row>
                        <Col md={5} style={{ paddingTop: "20px", paddingLeft: "70px" }}>
                            <Button variant="outline-secondary" style={{ width: '70%', height: '100%', backgroundColor: "#FFCC00", color: "black", fontWeight: "bold" }} onClick={handlePayment}>Thanh toán</Button>
                        </Col>
                        <Col md={6} style={{ paddingTop: "20px", paddingLeft: "80px" }}>
                            Bằng việc nhấn nút Tiếp tục, bạn đồng ý với <a href="/privacy-policy">Chính sách bảo mật thanh toán</a> và <a href="/terms">Quy chế</a>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "end", paddingRight: "70px" }}>
                        Bạn sẽ sớm nhận được biên số xe, số điện thoại tài xế và dễ dàng thay đổi điểm đón trả sau khi đặt.
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PaymentMethods;