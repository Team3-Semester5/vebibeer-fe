import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRouteModal from './AddRouteModal';
import UpdateRouteModal from './UpdateRouteModal';
import DeleteRouteModal from './DeleteRouteModal';

const RouteList = () => {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/routes/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRoutes(data);
                setFilteredRoutes(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, []);

    useEffect(() => {
        let filtered = routes;

        if (searchTerm) {
            filtered = filtered.filter(route =>
                route.route_description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredRoutes(filtered);
    }, [searchTerm, routes]);

    const handleAddRoute = (newRoute) => {
        setRoutes([...routes, newRoute]);
        setFilteredRoutes([...routes, newRoute]);
    };

    const handleUpdateRoute = (updatedRoute) => {
        const updatedRoutes = routes.map((route) =>
            route.route_id === updatedRoute.route_id ? updatedRoute : route
        );
        setRoutes(updatedRoutes);
        setFilteredRoutes(updatedRoutes);
    };

    const handleDeleteRoute = (routeId) => {
        const updatedRoutes = routes.filter(
            (route) => route.route_id !== routeId
        );
        setRoutes(updatedRoutes);
        setFilteredRoutes(updatedRoutes);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Route List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Route
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Route Description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Bus Company</th>
                        <th>Start Point</th>
                        <th>End Point</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Route Policy</th>
                        <th>Route Description</th>
                        <th>Cars</th>
                        <th>Driver</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoutes.map((route) => (
                        <tr key={route.route_id}>
                            <td>{route.busCompany ? route.busCompany.buscompany_name : 'N/A'}</td>
                            <td>{route.start_point ? route.start_point.location_name : 'N/A'}</td>
                            <td>{route.end_point ? route.end_point.location_name : 'N/A'}</td>
                            <td>{new Date(route.start_time).toLocaleString()}</td>
                            <td>{new Date(route.end_time).toLocaleString()}</td>
                            <td>{route.route_policy}</td>
                            <td>{route.route_description}</td>
                            <td>
                               {route.car.car_code}
                            </td>
                            <td>{route.driver != null ? route.driver.driver_name : 'N/A'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedRoute(route);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedRoute(route);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddRouteModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddRoute}
            />
            <UpdateRouteModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                route={selectedRoute}
                onUpdate={handleUpdateRoute}
            />
            <DeleteRouteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                route={selectedRoute}
                onDelete={handleDeleteRoute}
            />
        </div>
    );
};

export default RouteList;