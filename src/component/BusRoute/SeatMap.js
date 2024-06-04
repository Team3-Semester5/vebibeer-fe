import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './SeatMap.css'; // Ensure your CSS is updated accordingly

function SeatMap({ route }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);

    const toggleSeatSelection = (seatId) => {
        const updatedSelection = selectedSeats.includes(seatId)
            ? selectedSeats.filter(id => id !== seatId)
            : [...selectedSeats, seatId];
        setSelectedSeats(updatedSelection);
        const seat = seats.find(seat => seat.ticket_seat === seatId);
        if (seat) {
            const priceChange = selectedSeats.includes(seatId) ? -seat.ticket_price : seat.ticket_price;
            setTotalMoney(currentTotal => currentTotal + priceChange);
        }
    };

    useEffect(() => {
        const fetchSeatList = async () => {
            try {
                const response = await fetch('http://localhost:8080/tickets/' + route.route_id);
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
    }, [route.route_id]);

    const formatSeats = (deck) => {
        return seats.filter(seat => seat.ticket_seat.startsWith(deck))
            .reduce((rows, seat) => {
                const row = seat.ticket_seat.slice(1);
                rows[row] = rows[row] || [];
                rows[row].push(seat);
                return rows;
            }, {});
    };

    const renderDeck = (deckSeats, deckName, isLowerDeck) => {
        const seatRows = Object.keys(deckSeats).map(row => {
            // Create sub-arrays each with up to 3 seats
            const seatsInRow = [];
            for (let i = 0; i < deckSeats[row].length; i += 3) {
                seatsInRow.push(deckSeats[row].slice(i, i + 3));
            }
            return { row, seats: seatsInRow };
        });

        return (
            <Card className="mb-3">
                <Card.Header className="text-center">{deckName}</Card.Header>
                <Card.Body>
                    {isLowerDeck && <div className="steering-wheel mb-2"></div>}
                    {seatRows.map(({ row, seats }) => (
                        <div key={row} className="d-flex flex-column">
                            {seats.map((group, index) => (
                                <div key={index} className="d-flex">
                                    {group.map(seat => (
                                        <Button
                                            key={seat.ticket_seat}
                                            variant={selectedSeats.includes(seat.ticket_seat) ? 'success' : 'secondary'}
                                            disabled={seat.ticket_status !== 'Empty'}
                                            className="seat"
                                            onClick={() => toggleSeatSelection(seat.ticket_seat)}
                                        >
                                            {seat.ticket_seat}
                                        </Button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </Card.Body>
            </Card>
        );
    };

    const lowerDeckSeats = formatSeats('A');
    const upperDeckSeats = formatSeats('B');

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h3>Chú thích</h3>
                            <p><span className="seat not-available"></span> Ghế không bán</p>
                            <p><span className="seat selected"></span> Đang chọn</p>
                            <p>CABIN ĐƠN (1 Khách)</p>
                            <p>{seats.length > 0 && `${seats[0].ticket_price}đ <del>${seats[0].ticket_price * 1.21}đ</del>`}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    {renderDeck(lowerDeckSeats, "Tầng dưới", true)}

                </Col>
                <Col md={4}>
                    {renderDeck(upperDeckSeats, "Tầng trên", false)}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-right">
                    <p>Tổng cộng: {totalMoney}đ</p>
                    <Button variant="primary" className="float-right">Tiếp tục</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SeatMap;