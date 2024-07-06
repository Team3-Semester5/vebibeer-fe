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
            "orderInfo":  orderInfo
            
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src={require("./okne.png")}
                            alt="Vexere"
                            width="124px"
                            height="60px"
                            className="d-inline-block align-top"
                            style={{ marginLeft: "20px" }}
                        />
                    </a>
                    <div
                        className="mx-auto text-white uppercase-text  large-text"
                        style={{ fontSize: "23px " }}
                    >
                        Thời gian thanh toán còn lại
                        <span className="badge badge-danger ml-2  large-text">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </nav>
            <div className="container mt-4" style={{ marginBottom: "124px" }}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="list-group">
                            <div className="list-group-item">
                                <h2>Phương thức thanh toán</h2>
                                <label className="d-flex align-items-start">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="qr"
                                        checked={selectedMethod === "qr"}
                                        onChange={() => handleSelection("qr")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <FontAwesomeIcon
                                                icon={faQrcode}
                                                className="mr-2"
                                                style={{ color: "#0099FF", marginRight: "10px" }}
                                            />
                                            QR chuyển khoản/ Ví điện tử
                                            <span className="badge badge-success ml-2">
                                                An toàn & tiện lợi
                                            </span>
                                        </div>
                                        <p>
                                            Không cần nhập thông tin. Xác nhận thanh toán tức thì,
                                            nhanh chóng và ít sai sót.
                                        </p>
                                        <div className="d-flex align-items-center mt-2">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                                alt="MoMo"
                                                style={{ marginRight: "20px" }}
                                                className="mr-20"
                                                width="30"
                                            />
                                            <img
                                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                                                alt="ZaloPay"
                                                style={{ marginRight: "20px" }}
                                                className="mr-20"
                                                width="30"
                                            />
                                            <img
                                                src="https://monfin.vn/images/source/Congty/viettelpay.png"
                                                alt="ViettelPay"
                                                style={{ marginRight: "20px" }}
                                                className="mr-20"
                                                width="30"
                                            />
                                            <a href="#more" className="ml-auto">
                                                Xem tất cả
                                            </a>
                                        </div>
                                    </div>
                                </label>
                                {selectedMethod === "qr" && (
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
                                        value="shopeepay"
                                        checked={selectedMethod === "shopeepay"}
                                        onChange={() => handleSelection("shopeepay")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <FontAwesomeIcon
                                                icon={faMoneyBill}
                                                className="mr-2"
                                                style={{ color: "#FF9900", marginRight: "10px" }}
                                            />
                                            Ví ShopeePay
                                        </div>
                                        <p>
                                            Điện thoại của bạn phải được cài đặt ứng dụng ShopeePay
                                            <br />
                                            <span className="text-success font-weight-bold">
                                                Nhập mã SPPVEXE06 tại ví ShopeePay - Giảm 10K cho đơn
                                                hàng xe khách từ 100K -{" "}
                                                <a href="#terms">Điều kiện sử dụng</a>
                                            </span>
                                        </p>
                                    </div>
                                </label>
                                {selectedMethod === "shopeepay" && (
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
                                        value="momo"
                                        checked={selectedMethod === "momo"}
                                        onChange={() => handleSelection("momo")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                                alt="MoMo"
                                                style={{ marginRight: "20px" }}
                                                className="mr-20"
                                                width="30"
                                            />
                                            Ví MoMo
                                        </div>
                                        <p>
                                            Điện thoại của bạn phải được cài đặt ứng dụng MoMo
                                            <br />
                                            <span className="text-success font-weight-bold">
                                                Nhập mã MOMOVXR15 tại ứng dụng MoMo - Giảm 15K cho đơn
                                                hàng Vexere từ 350K -{" "}
                                                <a href="#terms">Điều kiện sử dụng</a>
                                            </span>
                                        </p>
                                    </div>
                                </label>
                                {selectedMethod === "momo" && (
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
                                        value="international"
                                        checked={selectedMethod === "international"}
                                        onChange={() => handleSelection("international")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <FontAwesomeIcon
                                                icon={faCreditCard}
                                                className="mr-2"
                                                style={{ marginRight: "10px", color: "#0099FF" }}
                                            />
                                            Thẻ thanh toán quốc tế
                                        </div>
                                        <p>Thẻ Visa, MasterCard, JCB</p>
                                    </div>
                                </label>
                                {selectedMethod === "international" && (
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

                            <div className="list-group-item">
                                <label className="d-flex align-items-start">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="zalopay"
                                        checked={selectedMethod === "zalopay"}
                                        onChange={() => handleSelection("zalopay")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <img
                                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                                                alt="vnpay"
                                                style={{ marginRight: "6px" }}
                                                className="mr-20"
                                                width="30"
                                            />
                                            Ví ZaloPay
                                        </div>
                                        <p>Điện thoại của bạn phải được cài đặt ứng dụng ZaloPay</p>
                                    </div>
                                </label>
                                {selectedMethod === "zalopay" && (
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
                                        value="atm"
                                        checked={selectedMethod === "atm"}
                                        onChange={() => handleSelection("atm")}
                                        className="mr-2"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <FontAwesomeIcon
                                                icon={faUniversity}
                                                className="mr-2"
                                                style={{ color: "#0099FF", marginRight: "10px" }}
                                            />
                                            Thẻ ATM nội địa / Internet Banking
                                        </div>
                                        <p>Tài khoản phải có đăng ký Internet Banking</p>
                                    </div>
                                </label>
                                {selectedMethod === "atm" && (
                                    <div className="alert alert-info text-center mt-2">
                                        Đã chuyển tiền
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Tổng tiền</h5>
                                <p className="card-text">650.000đ</p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Mã giảm giá</h5>
                                <a href="#" className="card-link">
                                    Chọn hoặc nhập mã
                                </a>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Thông tin chuyến đi</h5>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon
                                            icon={faTruck}
                                            className="mr-2"
                                            style={{ marginRight: "10px" }}
                                        />
                                        CN, 16/06/2024
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />1
                                    </div>
                                    <a href="#" className="ml-auto">
                                        Chi tiết
                                    </a>
                                </div>
                                <div className="d-flex mt-3">
                                    <img
                                        src="https://limody.vn/wp-content/uploads/2020/09/xe-kim-chi-265-2.jpg?v=1601442611"
                                        alt="Bus"
                                        className="mr-3"
                                        style={{
                                            width: "90px",
                                            height: "50px",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <div>
                                        <h6 className="mb-0">Tân Kim Chi</h6>
                                        <small className="text-muted">
                                            Limousine giường phòng 24 chỗ (CABIN ĐÔI)
                                        </small>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div className="mr-3 text-center">
                                            <h6 className="mb-0">20:16</h6>
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="text-primary mr-2"
                                            />
                                            <small className="text-muted">VP Đà Nẵng</small>
                                            <small className="text-muted d-block">46 Nam Trân</small>
                                        </div>
                                        <div className="border-left pl-3">
                                            <a href="#">Thay đổi</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="d-flex">
                                        <div className="mr-3 text-center">
                                            <h6 className="mb-0">07:16 (17/06)</h6>
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="text-danger mr-2"
                                            />

                                            <small className="text-muted">Bến xe Nước Ngầm</small>
                                            <small className="text-muted d-block">
                                                Số 1 Ngọc Hồi, Hoàng Liệt
                                            </small>
                                        </div>
                                        <div className="border-left pl-3">
                                            <a href="#">Thay đổi</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Thông tin liên hệ</h5>
                                <p className="card-text">Hành khách: truong linh</p>
                                <p className="card-text">Số điện thoại: 123456789</p>
                                <p className="card-text">Email: chumlu2102@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="container-fluit mt-12"
                style={{ marginTop: " 40px", width: " 400%", height: "" }}
            >
                <div
                    className="row"
                    style={{
                        position: "fixed",
                        marginTop: "5px",
                        textAlign: "center",
                        bottom: "0px",
                        width: " 100%",
                        backgroundColor: "white",
                        borderTop: "2px solid black ", // Added black border
                    }}
                >
                    <div
                        className="col-md-5 p-0"
                        style={{ marginLeft: " 230px", marginTop: "15px" }}
                    >
                        <button className="btn btn-warning btn-lg w-100 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon
                                icon={faShieldAlt}
                                className="mr-2"
                                style={{ marginRight: "10px" }}
                            />
                            <span className="text-center">Thanh toán</span>
                        </button>
                    </div>
                    <div className="col-md-4" style={{ marginTop: "15px" }}>
                        <div className="ml-3">
                            <p className="mb-0">
                                Bạn sẽ sớm nhận được biển số xe, số điện thoại tài xế và dễ dàng
                                thay đổi điểm đón trả sau khi đặt.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-12 text-center text-md-left mt-3 mt-md-0">
                        <p className="m-3" style={{ marginLeft: "30px " }}>
                            Bằng việc nhấn nút Thanh toán, bạn đồng ý với
                            <a href="#terms" className="m-2">
                                Chính sách bảo mật thanh toán
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;
