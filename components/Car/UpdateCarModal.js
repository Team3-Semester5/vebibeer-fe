import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCarModal = ({ show, onHide, car, onUpdate }) => {
    const [updatedCar, setUpdatedCar] = useState(car);
    const [error, setError] = useState(null);
    const [previewImages, setPreviewImages] = useState({
        car_img1: car ? car.car_img1 : '',
        car_img2: car ? car.car_img2 : '',
        car_img3: car ? car.car_img3 : '',
        car_img4: car ? car.car_img4 : '',
        car_img5: car ? car.car_img5 : '',
        car_img6: car ? car.car_img6 : ''
    });

    useEffect(() => {
        setUpdatedCar(car);
        setPreviewImages({
            car_img1: car ? car.car_img1 : '',
            car_img2: car ? car.car_img2 : '',
            car_img3: car ? car.car_img3 : '',
            car_img4: car ? car.car_img4 : '',
            car_img5: car ? car.car_img5 : '',
            car_img6: car ? car.car_img6 : ''
        });
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCar({ ...updatedCar, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedCar({ ...updatedCar, [name]: reader.result });
                setPreviewImages({ ...previewImages, [name]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/cars/${updatedCar.car_id}`, {
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
                <Modal.Title>Update Car</Modal.Title>
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
                            name="car_amount_seat"
                            value={updatedCar.car_amount_seat || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {['car_img1', 'car_img2', 'car_img3', 'car_img4', 'car_img5', 'car_img6'].map((img, index) => (
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
                                value={updatedCar[img]}
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
                    {/* <Form.Group controlId="formBusCompanyId">
                        <Form.Label>Bus Company ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="bus_company_id"
                            value={updatedCar.buscompany}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                </Form>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update Car
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateCarModal;