import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCarModal = ({ show, onHide, onAdd }) => {
    const [car, setCar] = useState({
        car_code: '',
        amount_seat: '',
        car_imgUrl1: '',
        car_imgUrl2: '',
        car_imgUrl3: '',
        car_imgUrl4: '',
        car_imgUrl5: '',
        car_imgUrl6: '',
        car_manufacturer: '',
        busCompany_id: 1// Automatically set from props1
    });



    const [error, setError] = useState(null);
    const [previewImages, setPreviewImages] = useState({
        car_imgUrl1: '',
        car_imgUrl2: '',
        car_imgUrl3: '',
        car_imgUrl4: '',
        car_imgUrl5: '',
        car_imgUrl6: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCar({ ...car, [name]: reader.result });
                setPreviewImages({ ...previewImages, [name]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/buscompany/car/save/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newCar = await response.json();
            onAdd(newCar);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding car:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Bus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCarCode">
                        <Form.Label>Car Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="car_code"
                            value={car.car_code || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAmountSeat">
                        <Form.Label>Amount of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount_seat"
                            value={car.amount_seat || ''}
                            onChange={handleChange} />
                    </Form.Group>
                    {['car_imgUrl1', 'car_imgUrl2', 'car_imgUrl3', 'car_imgUrl4', 'car_imgUrl5', 'car_imgUrl6'].map((img, index) => (
                        <Form.Group controlId={`form${img}`} key={index}>
                            <Form.Label>Car Image {index + 1}</Form.Label>
                            <Form.Control
                                type="file"
                                name={img}
                                onChange={handleFileChange}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Or enter image URL"
                                name={img}
                                value={car[img]}
                                onChange={handleChange}
                                style={{ marginTop: '10px' }}
                            />
                            {previewImages[img] && <img src={previewImages[img]} alt={`Preview of Car Image ${index + 1}`} style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                        </Form.Group>
                    ))}
                    <Form.Group controlId="formCarManufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control
                            type="text"
                            name="car_manufacturer"
                            value={car.car_manufacturer || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Bus
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCarModal;