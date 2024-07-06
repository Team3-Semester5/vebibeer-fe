import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCarModal = ({ show, onHide, car, onUpdate }) => {
    const [updatedCar, setUpdatedCar] = useState(car);
    const [error, setError] = useState(null);
    const [previewImages, setPreviewImages] = useState({
        car_imgUrl1: car ? car.car_imgUrl1 : '',
        car_imgUrl2: car ? car.car_imgUrl2 : '',
        car_imgUrl3: car ? car.car_imgUrl3 : '',
        car_imgUrl4: car ? car.car_imgUrl4 : '',
        car_imgUrl5: car ? car.car_imgUrl5 : '',
        car_imgUrl6: car ? car.car_imgUrl6 : ''
    });

    useEffect(() => {
        if (car) {
            setUpdatedCar(car);
            setPreviewImages({
                car_imgUrl1: car.car_imgUrl1 || '',
                car_imgUrl2: car.car_imgUrl2 || '',
                car_imgUrl3: car.car_imgUrl3 || '',
                car_imgUrl4: car.car_imgUrl4 || '',
                car_imgUrl5: car.car_imgUrl5 || '',
                car_imgUrl6: car.car_imgUrl6 || ''
            });
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCar(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedCar(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
                setPreviewImages(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buscompany/car/update/${updatedCar.car_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCar)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating car:', error);
        }
    };

    if (!updatedCar) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Bus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCarCode">
                        <Form.Label>Car Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="car_code"
                            value={updatedCar.car_code || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAmountSeat">
                        <Form.Label>Amount of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount_seat"
                            value={updatedCar.amount_seat || ''}
                            onChange={handleChange}
                        />
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
                                value={updatedCar[img] || ''}
                                onChange={handleChange}
                                style={{ marginTop: '10px' }}
                            />
                            {previewImages[img] && <img src={previewImages[img]} alt={`Car Image ${index + 1}`} style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                        </Form.Group>
                    ))}
                    <Form.Group controlId="formCarManufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control
                            type="text"
                            name="car_manufacturer"
                            value={updatedCar.car_manufacturer || ''}
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
                    Update Bus
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateCarModal;
