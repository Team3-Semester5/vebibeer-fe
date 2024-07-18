import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import checkMark from '../assets/images/checkmark.png';
import failed from '../assets/images/failed.png';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [isSuccess, setSuccess] = (false);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get('status');
        if (status === 'success') {
            setSuccess(true);
        }
      }, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="8">
                    <Card className="p-3 text-center">
                        {isSuccess ? (
                            <Card.Body>
                                <Card.Title className="mb-2">Verify Successfully!</Card.Title>
                                <img src={checkMark} alt="Check Mark" style={{ width: '70px', height: '70px', margin: '10px auto' }} />
                                <Card.Text>
                                    You can login now
                                </Card.Text>
                                <Button variant="success" className="mt-3" onClick={() => {navigate("/login")}}>Continue</Button>
                            </Card.Body>
                        ) : (
                            <Card.Body>
                                <Card.Title className="mb-2">Xác minh thất bại!</Card.Title>
                                <img src={failed} alt="Check Mark" style={{ width: '90px', height: '90px', margin: '10px auto' }} />
                                <Card.Text>
                                    Vui lòng kiểm tra lại!
                                </Card.Text>
                                <Button variant="danger" className="mt-3" onClick={() => {navigate("/login")}}>Trở lại</Button>
                            </Card.Body>
                        )}

                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyEmail;