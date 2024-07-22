import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL } from '../../../../constaint/fetchApi';

const UpdateRouteModal = ({ show, onHide, oldRoute, onUpdate }) => {
    const [route, setRoute] = useState({
        busCompany_id: 1,
        startLocation_id: '',
        endLocation_id: '',
        route_startTime: '',
        route_endTime: '',
        policy: '',
        route_description: '',
        car_id: '',
        driver_id: '',
        priceTicket: ''
    });

    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (oldRoute) {
            setRoute({
                route_id: oldRoute.route_id,
                busCompany_id: oldRoute.busCompany.busCompany_id,
                startLocation_id: oldRoute.startLocation.location_id,
                endLocation_id: oldRoute.endLocation.location_id,
                route_startTime: oldRoute.route_startTime,
                route_endTime: oldRoute.route_endTime,
                policy: oldRoute.policy,
                route_description: oldRoute.route_description,
                car_id: oldRoute.car.car_id,
                driver_id: oldRoute.driver.driver_id,
                priceTicket: oldRoute.priceTicket || ''
            });
        }
    }, [oldRoute]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const predefinedLocations = await fetch(`${API_URL}/api/locations/`);
                const carRes = await fetch(`${API_URL}/buscompany/car/by-company/1`);
                const driverRes = await fetch(`${API_URL}/buscompany/driver/by-company/1`);

                if (!carRes.ok || !driverRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const locations = await predefinedLocations.json();
                const cars = await carRes.json();
                const drivers = await driverRes.json();

                setLocations(locations);
                setCars(cars);
                setDrivers(drivers);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoute({ ...route, [name]: value });
    };

    const handleSubmit = async () => {
        if (!route.busCompany_id || !route.startLocation_id || !route.endLocation_id || !route.route_startTime || !route.route_endTime || !route.driver_id) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/route/buscompany/update/${route.busCompany_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(route)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message}`);
            }
            const newRoute = await response.json();
            onUpdate(newRoute);
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

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {oldRoute ? (
                    <Form>
                        <Form.Group controlId="formStartPoint">
                            <Form.Label>Start Point</Form.Label>
                            <Form.Control
                                as="select"
                                name="startLocation_id"
                                value={route.startLocation_id}
                                onChange={handleChange}
                            >
                                <option value={oldRoute.startLocation.location_id}>{oldRoute.startLocation.location_name}</option>
                                {locations.map((location) => (
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
                                name="endLocation_id"
                                value={route.endLocation_id}
                                onChange={handleChange}
                            >
                                <option value={oldRoute.endLocation.location_id}>{oldRoute.endLocation.location_name}</option>
                                {locations.map((location) => (
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
                                name="route_startTime"
                                value={getFormattedDateTime(route.route_startTime)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="route_endTime"
                                value={getFormattedDateTime(route.route_endTime)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRoutePolicy">
                            <Form.Label>Route Policy</Form.Label>
                            <Form.Control
                                type="text"
                                name="policy"
                                value={route.policy}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRouteDescription">
                            <Form.Label>Route Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="route_description"
                                value={route.route_description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCar">
                            <Form.Label>Car</Form.Label>
                            <Form.Control
                                as="select"
                                name="car_id"
                                value={route.car_id}
                                onChange={handleChange}
                            >
                                <option value={oldRoute.car.car_id}>{oldRoute.car.car_code}</option>
                                {cars.map((car) => (
                                    <option key={car.car_id} value={car.car_id}>
                                        {car.car_code}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDriver_iddriver_id">
                            <Form.Label>Driver</Form.Label>
                            <Form.Control
                                as="select"
                                name="driver_id"
                                value={route.driver_id}
                                onChange={handleChange}
                            >
                                <option value={oldRoute.driver.driver_id}>{oldRoute.driver.driver_name}</option>
                                {drivers.map((driver) => (
                                    <option key={driver.driver_id} value={driver.driver_id}>
                                        {driver.driver_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="priceTicket">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="priceTicket"
                                value={route.priceTicket}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <p>Loading...</p>
                )}
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Route
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateRouteModal;
