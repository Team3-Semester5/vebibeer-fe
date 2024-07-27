import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SeatMap.css';
import { API_URL } from '../../constaint/fetchApi';

function SeatMap({ route, customerName }) {
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lockedSeats, setLockedSeats] = useState({});

    const fetchSeats = async () => {
        try {
            const response = await fetch(`${API_URL}/tickets/${route.route_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSeats(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const lockSeat = async (seatId) => {
        try {
            const response = await fetch(`${API_URL}/tickets/lock?ticketSeat=${seatId}&routeId=${route.route_id}&customerName=${customerName}`, {
                method: 'POST',
            });

            if (response.ok) {
                const lockTime = 20000; // 5 minutes
                setLockedSeats(prevState => ({
                    ...prevState,
                    [seatId]: Date.now() + lockTime
                }));

                setTimeout(() => {
                    setLockedSeats(prevState => {
                        const { [seatId]: _, ...rest } = prevState;
                        return rest;
                    });
                }, lockTime);
                return true;
            } else {
                alert('Seat is already locked by another customer. Please select a different seat.');
                return false;
            }
        } catch (error) {
            alert('Failed to lock seat. Please try again.');
            console.error('Locking error:', error);
            return false;
        }
    };

    const toggleSeatSelection = async (seatId) => {
        const isSelected = selectedSeats.includes(seatId);
        if (!isSelected && !lockedSeats[seatId]) {
            const lockSuccessful = await lockSeat(seatId);
            if (lockSuccessful) {
                updateSelectedSeats(seatId, isSelected);
            }
        } else if (isSelected) {
            updateSelectedSeats(seatId, isSelected);
        } else {
            alert('Seat is locked by another customer. Please select a different seat.');
        }
    };

    const updateSelectedSeats = (seatId, isSelected) => {
        const updatedSelection = isSelected
            ? selectedSeats.filter(id => id !== seatId)
            : [...selectedSeats, seatId];
        setSelectedSeats(updatedSelection);

        const seat = seats.find(seat => seat.ticket_seat === seatId);
        if (seat) {
            const priceChange = isSelected ? -seat.ticket_price : seat.ticket_price;
            setTotalMoney(currentTotal => {
                const updatedTotal = currentTotal + priceChange;
                sessionStorage.setItem("totalMoney", updatedTotal);
                return updatedTotal;
            });
            sessionStorage.setItem("totalMoney", totalMoney);
        }
        updateSeatInCart(seat, isSelected);
    };

    const updateSeatInCart = (seat, isSelected) => {
        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        if (isSelected) {
            // Remove from cart
            cart = cart.filter(item => item.ticket_seat !== seat.ticket_seat);
        } else {
            // Add to cart
            cart.push(seat);
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
    };

    function formatNumber(number) {
        return new Intl.NumberFormat('vi-VN').format(number);
    }

    useEffect(() => {
        fetchSeats();
        const savedSeats = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const money = parseInt(sessionStorage.getItem("totalMoney") || '0');
        setSelectedSeats(savedSeats.map(seat => seat.ticket_seat));
        setTotalMoney(money);
    }, [route.route_id]);

    // const handleBooking = async (seatId) => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`${API_URL}/tickets/book?ticketSeat=${seatId}&routeId=${route.route_id}&customerName=${customerName}`, {
    //             method: 'POST',
    //         });

    //         if (response.ok) {
    //             alert('Seat booked successfully');
    //             fetchSeats(); // Refresh seats
    //         } else if (response.status === 409) {
    //             alert('Seat is already booked. Please select another seat.');
    //             fetchSeats(); // Refresh seats
    //         } else {
    //             alert('Failed to book seat. Please try again.');
    //         }
    //     } catch (error) {
    //         alert('Failed to book seat. Please try again.');
    //         console.error('Booking error:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const renderDeck = (deckName, isLowerDeck) => {
        const deckSeats = seats.filter(seat => seat.ticket_seat.startsWith(deckName));
        return (
            <Card className="deck-card" key={deckName}>
                <Card.Header className="deck-header">{deckName} {isLowerDeck && <span className="icon-steering-wheel"></span>}</Card.Header>
                <Card.Body style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <Container>
                        <Row>
                            {deckSeats.map(seat => (
                                <Col key={seat.ticket_seat}>
                                    <Button
                                        variant={selectedSeats.includes(seat.ticket_seat) ? 'success' : 'secondary'}
                                        disabled={seat.ticket_status !== 'Empty' || loading || lockedSeats[seat.ticket_seat]}
                                        className="seat-button"
                                        onClick={() => {
                                            toggleSeatSelection(seat.ticket_seat);
                                            // handleBooking(seat.ticket_seat);
                                        }}
                                    >
                                        {seat.ticket_seat}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        );
    };

    const handleContinue = () => {
        sessionStorage.setItem('bus_company_id', route.busCompany.busCompany_id);
        navigate('/cart'); // Adjust the path as needed
    };

    return (
        <Container className="seat-map-container">
            <Row>
                <Col sm={12} md={4}>
                    <Card className="info-card">
                        <Card.Body>
                            <div>Notice</div>
                            <div className="legend-item">
                                <Button variant='secondary' disabled> A0 </Button>
                                <span style={{ marginLeft: '5px' }}>  Sold</span>
                            </div>
                            <div className="legend-item">
                                <Button variant='success'> A0 </Button>
                                <span style={{ marginLeft: '5px' }}>Picking</span>
                            </div>
                            <div className="legend-item">
                                <Button variant='secondary'> A0 </Button>
                                <span style={{ marginLeft: '5px' }}>  Empty</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    {renderDeck('A', true)}
                </Col>
                <Col sm={12} md={4}>
                    {renderDeck('B', false)}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-right">
                    <div className="total-price">Total: {formatNumber(totalMoney * 1000)} VNĐ</div>
                    <Button className="continue-button" onClick={handleContinue} disabled={loading}>Continue</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SeatMap;
