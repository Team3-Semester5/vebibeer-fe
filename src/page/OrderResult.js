import React, { useEffect, useState } from 'react';
import './OrderResult.css';
import { useNavigate } from 'react-router-dom';

const OrderResult = () => {
    const [status, setStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            const status = url.searchParams.get('status');
            if (status === 'OrderSuccess') {
                setIsSuccess(true);
            }
            setStatus(status); // Set the status state with the fetched status
            const savedSeats = JSON.parse(sessionStorage.getItem('cart') || '[]');
            setTickets(savedSeats);
            console.log(tickets.toString());
            setTotalMoney(parseInt(sessionStorage.getItem("newTotalMoney")));
        } catch (error) {
            console.log(error)
        }


    }, []);

    const backToHome = () => {
        if (status === 'OrderSuccess') {
            sessionStorage.removeItem('cart');
            sessionStorage.setItem('totalMoney', 0);
        }

    }

    return (
        isSuccess ? (
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
                        {tickets.map((ticket) => {
                            <div className="item" key={ticket.ticket_id}>
                                <img src={ticket.route.car.car_imgUrl1} alt="Womens Scarfs" />
                                <p>{ticket.ticket_seat}</p>
                                <span>{ticket.ticket_price}.000 VND</span>
                            </div>
                        })}

                        <div className="total">
                            <strong>Total: </strong>
                            <strong>{totalMoney}.000 VND</strong>
                        </div>
                    </div>
                    <button className="home-button" onClick={backToHome()}>Hello</button>
                    <button className="home-button" onClick={() => navigate('/')}>Back To Menu</button>
                </div>
            </div>
        ) : (
            <div>
                <div className="thank-you-container" style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="confirmation-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 16 16"
                            className="bi bi-x-circle"
                        >
                            <circle cx="8" cy="8" r="8" fill="#d32f2f" />
                            <path fill="#ffffff" d="M11 5L5 11M5 5l6 6" stroke="#ffffff" strokeLinecap="round" strokeWidth="2" />
                        </svg>
                    </div>
                    <h1>Order Failed</h1>
                    <p>Unfortunately, your order could not be processed at this time.<br />Please try again later or contact support if the issue persists.</p>
                    <button className="home-button danger" onClick={() => navigate('/')}>Back To Menu</button>
                </div>
            </div>
        )

    );
}

export default OrderResult;