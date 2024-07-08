import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRouteModal from './AddRouteModal';
import UpdateRouteModal from './UpdateRouteModal';
import DeleteRouteModal from './DeleteRouteModal';
import '../../../../assets/css/Buscompany.css';
const RouteList = () => {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('http://localhost:8080/route/');
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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRoutes.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filteredRoutes.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
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
        <div className="container mt-4 buscompany">
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
                        <th>Start Location</th>
                        <th>End Location</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Route Policy</th>
                        <th>Route Description</th>
                        <th>Car</th>
                        <th>Driver</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((route) => (
                        <tr key={route.route_id}>
                            <td>{route.busCompany ? route.busCompany.busCompany_name : 'N/A'}</td>
                            <td>{route.startLocation ? route.startLocation.location_name : 'N/A'}</td>
                            <td>{route.endLocation ? route.endLocation.location_name : 'N/A'}</td>
                            <td>{new Date(route.route_startTime).toLocaleString()}</td>
                            <td>{new Date(route.route_endTime).toLocaleString()}</td>
                            <td>{route.policy}</td>
                            <td>{route.route_description}</td>
                            <td>{route.car ? route.car.car_code : 'N/A'}</td>
                            <td>{route.driver ? route.driver.driver_name : 'N/A'}</td>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleFirstPage}>First</button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNextPage}>Next</button>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleLastPage}>Last</button>
                        </li>
                    </ul>
                </nav>
            </div>
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