import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import {
    faQrcode,
    faBus,
    faCreditCard,
    faMoneyBill,
    faUniversity,
    faShieldAlt,
    faCalendarAlt,
    faUser,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Col, Container, Row } from "react-bootstrap";

const PaymentMethods = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
    const [error, setError] = useState([])
    // const [cartPayment, setCartPayment] = useState([])
    // const [user, setUser] = useState({})
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
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleSelection = (method) => {
        setSelectedMethod(method);
    };

    const handlePayment = () => {
        const amount = parseInt(sessionStorage.getItem('totalMoney'));
        // setUser();
        const user = JSON.parse(sessionStorage.getItem("user"))
        let orderInfo = user.username + ";";
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        // setCartPayment(cart);
        cart.forEach(ticket => {
            orderInfo = orderInfo + ticket.ticket_id + ",";
        });
        console.log(JSON.stringify({
            "amount": amount,
            "orderInfo": orderInfo

        }));
        alert(amount)
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

                })
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
        }
        fetchPayment();
    }

    return (
        <div style={{ backgroundColor: "#EEEEEE" }}>
            <Container>
                <Row>
                    <Col md={4}>
                        VEBIBEER
                    </Col>
                    <Col md={8}>
                        Hello
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={8}>
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
                                    {selectedMethod === "cash" && (
                                        <div className="alert alert-info text-center mt-2">
                                            Đã chuyển tiền
                                        </div>
                                    )}
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
                                            <button onClick={handlePayment}>Thanh toan</button>
                                            <p>
                                                Thiết bị cần cài đặt Ứng dụng ngân hàng (Mobile Banking)
                                                hoặc Ví VNPAY
                                            </p>
                                        </div>
                                    </label>
                                    {selectedMethod === "vnpay" && (
                                        <div className="alert alert-info text-center mt-2">
                                            Đã chuyển tiền
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        
                    </Col>
                </Row>
                <Row>
                    <div className="col-md-12 text-center text-md-left mt-3 mt-md-0">
                        <p className="m-3" style={{ marginLeft: "30px " }}>
                            Bằng việc nhấn nút Thanh toán, bạn đồng ý với
                            <a href="#terms" className="m-2">
                                Chính sách bảo mật thanh toán
                            </a>
                        </p>
                    </div>
                </Row>
            </Container>
        </div>

    );
};

export default PaymentMethods;
