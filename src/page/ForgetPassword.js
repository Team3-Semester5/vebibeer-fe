import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    const response = await fetch("http://localhost:8080/api/forgetPassword?username=" + email);
    if (!response.ok) {
      alert("cannot send email")
      return;
    }
    navigate("/verifyChangePassword?username=" + email);
  }

  return (
    <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>Quên mật khẩu</Card.Title>
                            <Form onSubmit={handleSend}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3" >
                                    Gửi
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}

export default ForgetPassword
