import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddDriverModal = ({ show, onHide, onAdd }) => {
    const [driver, setDriver] = useState({
        driver_name: '',
        driver_avaUrl: '',
        driver_description: '',
        busCompany: null
    });
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [busCompanies, setBusCompanies] = useState([]);

    useEffect(() => {
        fetchBusCompanies();
    }, []);

    const fetchBusCompanies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/busCompanies/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const busCompanies = await response.json();
            setBusCompanies(busCompanies);
        } catch (error) {
            console.error('Error fetching bus companies:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver({ ...driver, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDriver({ ...driver, driver_avaUrl: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBusCompanyChange = (e) => {
        const selectedBusCompany = busCompanies.find(company => company.busCompany_id === parseInt(e.target.value));
        setDriver({ ...driver, busCompany: selectedBusCompany });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/drivers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driver)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newDriver = await response.json();
            onAdd(newDriver);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding driver:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDriverName">
                        <Form.Label>Driver Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="driver_name"
                            value={driver.driver_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDriverAva">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            name="driver_ava"
                            onChange={handleFileChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Or enter image URL"
                            name="driver_ava"
                            value={driver.driver_avaUrl}
                            onChange={handleChange}
                            style={{ marginTop: '10px' }}
                        />
                        {previewImage && <img src={previewImage} alt="Avatar Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </Form.Group>
                    <Form.Group controlId="formDriverDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="driver_description"
                            value={driver.driver_description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBusCompany">
                        <Form.Label>Bus Company</Form.Label>
                        <Form.Control as="select" onChange={handleBusCompanyChange}>
                            <option value="">Select Bus Company</option>
                            {busCompanies.map(company => (
                                <option key={company.busCompany_id} value={company.busCompany_id}>
                                    {company.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body><Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Driver
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDriverModal;