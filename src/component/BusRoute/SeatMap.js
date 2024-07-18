import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SeatMap.css';
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

function SeatMap({ route }) {
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);

    const toggleSeatSelection = async (seatId) => {
        const isSelected = selectedSeats.includes(seatId);
        updateSelectedSeats(seatId, isSelected);
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



    useEffect(() => {
        const fetchSeatList = async () => {
            const response = await fetch(`${API_URL}/tickets/${route.route_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSeats(data);
        };

        fetchSeatList().catch(error => console.error('Error fetching tickets:', error));
        const savedSeats = JSON.parse(sessionStorage.getItem('cart') || '[]');
        console.log(savedSeats.toString());
        const money = parseInt(sessionStorage.getItem("totalMoney") || '0');
        setSelectedSeats(savedSeats.map(seat => seat.ticket_seat));
        setTotalMoney(money);
    }, [route.route_id]);

    const renderDeck = (deckName, isLowerDeck) => {
        const deckSeats = seats.filter(seat => seat.ticket_seat.startsWith(deckName));
        return (
            <Card className="deck-card">
                <Card.Header className="deck-header">{deckName} {isLowerDeck && <span className="icon-steering-wheel"></span>}</Card.Header>
                <Card.Body style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <Container>
                        <Row>
                            {deckSeats.map(seat => (
                                <Col>
                                    <Button
                                        key={seat.ticket_seat}
                                        variant={selectedSeats.includes(seat.ticket_seat) ? 'success' : 'secondary'}
                                        disabled={seat.ticket_status !== 'Empty'}
                                        className="seat-button"
                                        onClick={() => toggleSeatSelection(seat.ticket_seat)}

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
        navigate('/cart'); // Adjust the path as needed
    };

    return (
        <Container className="seat-map-container">
            <Row>
                <Col sm={12} md={4}>
                    <Card className="info-card">
                        <Card.Body>
                            <div>Chú thích</div>
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
                    <div className="total-price">Tổng cộng: {totalMoney * 1000} VND</div>
                    <Button className="continue-button" onClick={handleContinue}>Tiếp tục</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SeatMap;