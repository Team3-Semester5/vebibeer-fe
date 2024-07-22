import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL, API_URL1 } from '../../../../constaint/fetchApi';
import { Navigate, useNavigate } from 'react-router-dom';

const AddRouteModal = ({ show, onHide, onAdd }) => {
    const navigate = useNavigate();
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
        priceTicket:'',
        daily: false
    });
    // const [busCompanies, setBusCompanies] = useState([]);
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const busCompanyRes = await fetch(`${API_URL}/admin/buscompanies/`);
                const predefinedLocations =  await fetch(`${API_URL}/api/locations/`)
                const carRes = await fetch(`${API_URL}/buscompany/car/by-company/1`);
                const driver_idRes = await fetch(`${API_URL}/buscompany/driver/by-company/1`);
                if ( !carRes.ok || !driver_idRes.ok) {
                    throw new Error('Failed to fetch data');
                }
                // const busCompanies = await busCompanyRes.json();
                const locations = await predefinedLocations.json();
                const cars = await carRes.json();
                const drivers = await driver_idRes.json();

                // setBusCompanies(busCompanies);
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
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setRoute({...route, daily: value === 'on' ? true : false})
            return;
        }
        setRoute({ ...route, [name]: value });
    };

    const handleCarChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setRoute({ ...route, car_id: selectedOptions });
    };

    const handleSubmit = async () => {
        if (!route.busCompany_id || !route.startLocation_id || !route.endLocation_id || !route.route_startTime || !route.endLocation_id || !route.driver_id) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/route/buscomapany/save/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(route)
            });
            console.log(JSON.stringify(route))
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message}`);
            }
            const newRoute = await response.json();
            onAdd(newRoute);
            onHide();
        } catch (error) {
            setError(error.message);
            console.error('Error adding route:', error);
        }
        navigate(`/bus/route`);
    };

    const getFormattedDateTime = (dateString) => {
        if (!dateString) return ''; // Return empty string if dateString is empty
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // format as yyyy-MM-ddThh:mm
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formStartPoint">
                        <Form.Label>Start Point</Form.Label>
                        <Form.Control
                            as="select"
                            name="startLocation_id"
                            value={route.startLocation_id}
                            onChange={handleChange}
                        >
                            <option value="">Select a Start Point</option>
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
                            <option value="">Select an End Point</option>
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
                            <option value="">Select a Driver</option>
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
                    ---- CREATE AUTO DAILY ----
                    <Form.Group controlId="daily">
                        <Form.Label>Do you want to auto create</Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="daily"
                            label="YES..."
                            // checked={route.isDaily}
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
                    Add Route
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRouteModal;