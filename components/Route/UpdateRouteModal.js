import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateRouteModal = ({ show, onHide, route, onUpdate }) => {
    const [updatedRoute, setUpdatedRoute] = useState(route);
    const [busCompanies, setBusCompanies] = useState([]);
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);

    const predefinedLocations = [
        { location_id: '1', location_name: 'Hà Nội' },
        { location_id: '2', location_name: 'TP. Hồ Chí Minh' },
        { location_id: '3', location_name: 'Đà Nẵng' },
        { location_id: '4', location_name: 'Hải Phòng' },
        { location_id: '5', location_name: 'Cần Thơ' }
    ];

    useEffect(() => {
        setUpdatedRoute(route);
        const fetchData = async () => {
            try {
                const busCompanyRes = await fetch('http://localhost:8080/api/buscompanies/');
                const carRes = await fetch('http://localhost:8080/api/cars/');
                const driverRes = await fetch('http://localhost:8080/api/drivers/');
                if (!busCompanyRes.ok || !carRes.ok || !driverRes.ok) {
                    throw new Error('Failed to fetch data');
                }
                const busCompanies = await busCompanyRes.json();
                const cars = await carRes.json();
                const drivers = await driverRes.json();
                setBusCompanies(busCompanies);
                setCars(cars);
                setDrivers(drivers);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [route]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRoute({ ...updatedRoute, [name]: value });
    };

    const handleCarChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setUpdatedRoute({ ...updatedRoute, car: selectedOptions });
    };

    const handleSubmit = async () => {
        if (!updatedRoute.busCompany || !updatedRoute.start_point || !updatedRoute.end_point || !updatedRoute.start_time || !updatedRoute.end_time || !updatedRoute.driver) {
            setError('All fields are required.');
            return;
        }

        const preparedRoute = {
            ...updatedRoute,
            busCompany: { buscompany_id: updatedRoute.busCompany },
            start_point: { location_id: updatedRoute.start_point },
            end_point: { location_id: updatedRoute.end_point },
            car: updatedRoute.car.map(car_id => ({ car_id })),
            driver: { driver_id: updatedRoute.driver }
        };

        try {
            const response = await fetch(`http://localhost:8080/api/routes/${updatedRoute.route_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preparedRoute)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedData = await response.json();
            onUpdate(updatedData);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error updating route:', error);
        }
    };

    const getFormattedDateTime = (dateString) => {
        if (!dateString) return ''; // Return empty string if dateString is empty
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // format as yyyy-MM-ddThh:mm
    };

    if (!updatedRoute) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBusCompany">
                        <Form.Label>Bus Company</Form.Label>
                        <Form.Control
                            as="select"
                            name="busCompany"
                            value={updatedRoute.busCompany}
                            onChange={handleChange}
                        >
                            <option value="">Select a Bus Company</option>
                            {busCompanies.map((company) => (
                                <option key={company.buscompany_id} value={company.buscompany_id}>
                                    {company.buscompany_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStartPoint">
                        <Form.Label>Start Point</Form.Label>
                        <Form.Control
                            as="select"
                            name="start_point"
                            value={updatedRoute.start_point}
                            onChange={handleChange}
                        >
                            <option value="">Select a Start Point</option>
                            {predefinedLocations.map((location) => (
                                <option key={location.location_id} value={location.location_id}>
                                    {location.location_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEndPoint">
                        <Form.Label>End Point</Form.Label>
                        <Form.Control
                            as="select"
                            name="end_point"
                            value={updatedRoute.end_point}
                            onChange={handleChange}
                        >
                            <option value="">Select an End Point</option>
                            {predefinedLocations.map((location) => (
                                <option key={location.location_id} value={location.location_id}>
                                    {location.location_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="start_time"
                            value={getFormattedDateTime(updatedRoute.start_time)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEndTime">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="end_time"
                            value={getFormattedDateTime(updatedRoute.end_time)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRoutePolicy">
                        <Form.Label>Route Policy</Form.Label>
                        <Form.Control
                            type="text"
                            name="route_policy"
                            value={updatedRoute.route_policy}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRouteDescription">
                        <Form.Label>Route Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="route_description"
                            value={updatedRoute.route_description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCar">
                        <Form.Label>Car</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            name="car"
                            value={updatedRoute.car}
                            onChange={handleCarChange}
                        >
                            {cars.map((car) => (
                                <option key={car.car_id} value={car.car_id}>
                                    {car.car_code}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDriver">
                        <Form.Label>Driver</Form.Label>
                        <Form.Control
                            as="select"
                            name="driver"
                            value={updatedRoute.driver}
                            onChange={handleChange}
                        >
                            <option value="">Select a Driver</option>
                            {drivers.map((driver) => (
                                <option key={driver.driver_id} value={driver.driver_id}>
                                    {driver.driver_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update Route
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateRouteModal;