import React, { useState, useEffect } from 'react';
import { Container, Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log(`Toggled expanding event key ${eventKey}`)
    );
    return (
        <Card.Header
            onClick={decoratedOnClick}
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
        >
            {children}
        </Card.Header>
    );
}

const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await fetch('http://localhost:8080/paymentMethod');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPaymentMethods(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching payment methods:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    if (isLoading) {
        return (
            <Container className="text-center">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                <p>Loading...</p>
            </Container>
        );
    }

    if (error) {
        return <Container>Error: {error}</Container>;
    }

    return (
        <Container>
            <h3 className="text-center my-4">Phương thức thanh toán</h3>
            <Accordion defaultActiveKey="0">
                {paymentMethods.map((paymentMethod) => (
                    <Card key={paymentMethod.paymentMethod_id}>
                        <Card.Header>
                            <CustomToggle eventKey={paymentMethod.paymentMethod_id.toString()}>
                                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                {paymentMethod.paymentMethod_name}
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={paymentMethod.paymentMethod_id.toString()}>
                            <Card.Body>
                                <p>{paymentMethod.paymentMethod_description}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </Container>
    );
}

export default PaymentMethod;