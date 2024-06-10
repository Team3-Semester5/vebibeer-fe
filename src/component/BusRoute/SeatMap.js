import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SeatMap.css';

function SeatMap({ route }) {
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);

    const toggleSeatSelection = async (seatId) => {
        const isSelected = selectedSeats.includes(seatId);
        updateSelectedSeats(seatId, isSelected);
        await updateSeatInCart(seatId, isSelected);
    };

    const loadCartData = async () => {
        try {
            const response = await fetch('http://localhost:8080/cart', { credentials: 'include' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const cartData = await response.json();
            const cartSeats = cartData.map(item => item.ticket_seat);
            setSelectedSeats(cartSeats);
            const total = cartData.reduce((acc, item) => acc + item.ticket_price, 0);
            setTotalMoney(total);
        } catch (error) {
            console.error('Error loading cart data:', error);
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
            setTotalMoney(currentTotal => currentTotal + priceChange);
        }
    };
    
    const updateSeatInCart = async (seatId, isSelected) => {
        const seat = seats.find(seat => seat.ticket_seat === seatId);
        if (!seat) return;
    
        const url = `http://localhost:8080/cart/${seat.ticket_id}`;
        try {
            const response = await fetch(url, { method: isSelected ? 'DELETE' : 'POST', credentials: 'include' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log(data.toLocaleString())
            // Optionally handle response data
        } catch (error) {
            console.error('Error adding/removing tickets:', error);
        }
    };

    useEffect(() => {
        const fetchSeatList = async () => {
            try {
                const response = await fetch(`http://localhost:8080/tickets/${route.route_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchSeatList();
        loadCartData();
    }, [route.route_id]);

    const renderDeck = (deckName, isLowerDeck) => {
        const deckSeats = seats.filter(seat => seat.ticket_seat.startsWith(deckName));
        return (
            <Card className="deck-card">
                <Card.Header className="deck-header">{deckName} {isLowerDeck && <span className="icon-steering-wheel"></span>}</Card.Header>
                <Card.Body>
                    {deckSeats.map(seat => (
                        <Button
                            key={seat.ticket_seat}
                            variant={selectedSeats.includes(seat.ticket_seat) ? 'success' : 'secondary'}
                            disabled={seat.ticket_status !== 'Empty'}
                            className="seat-button"
                            onClick={() => toggleSeatSelection(seat.ticket_seat)}
                        >
                            {seat.ticket_seat}
                        </Button>
                    ))}
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
                                <button className="legend-button disabled"><i className="fa fa-cancel"></i></button>
                                <span>Ghế không bán</span>
                            </div>
                            <div className="legend-item">
                                <button className="legend-button selected"><i className="icon-check"></i></button>
                                <span>Đang chọn</span>
                            </div>
                            <div className="legend-item">
                                <button className="legend-button available"><i className="icon-square"></i></button>
                                <span>Còn trống</span>
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
                    <div className="total-price">Tổng cộng: {totalMoney}đ</div>
                    <Button className="continue-button" onClick={handleContinue}>Tiếp tục</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SeatMap;