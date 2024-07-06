import React, { useEffect, useState } from 'react';
import './OrderResult.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../component/Menu';

const OrderResult = () => {
    const [status, setStatus] = useState('');
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const status = url.searchParams.get('status');
        setStatus(status); // Set the status state with the fetched status
        setCart(JSON.parse(sessionStorage.getItem('cart')))
        if (status === 'OrderSuccess') {
            sessionStorage.removeItem('cart');
            sessionStorage.setItem('totalMoney', 0);
        }
    }, []);

    return (
        <div>
            <div className="thank-you-container">
                <div className="confirmation-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="currentColor"
                        className="bi bi-check-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-2.03a.75.75 0 0 0-1.07 0L7 10.939 5.525 9.464a.75.75 0 0 0-1.06 1.06L6.44 12.56a.75.75 0 0 0 1.06 0l4.47-4.47a.75.75 0 0 0 0-1.06z" />
                    </svg>
                </div>
                <h1>Thank you for your purchase</h1>
                <p>We've received your order and it will ship in 5-7 business days.<br />Your order number is #B6CT3</p>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="item">
                        <img src="shirt.jpg" alt="Cotton Shirt" />
                        <p>Half Sleeve 100% Cotton Shirts For Women</p>
                        <span>₹ 800</span>
                    </div>
                    <div className="item">
                        <img src="scarf.jpg" alt="Womens Scarfs" />
                        <p>Stylish womens scarfs combo</p>
                        <span>₹ 800</span>
                    </div>
                    <div className="total">
                        <strong>Total</strong>
                        <strong>₹ 1600</strong>
                    </div>
                </div>
                <button className="home-button" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
}

export default OrderResult;