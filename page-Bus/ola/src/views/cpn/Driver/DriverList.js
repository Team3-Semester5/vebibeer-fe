import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDriverModal from './AddDriverModal';
import UpdateDriverModal from './UpdateDriverModal';
import DeleteDriverModal from './DeleteDriverModal';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/drivers/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDrivers(data);
                setFilteredDrivers(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    useEffect(() => {
        let filtered = drivers;

        if (searchTerm) {
            filtered = filtered.filter(driver =>
                driver.driver_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredDrivers(filtered);
    }, [searchTerm, drivers]);

    const handleAddDriver = (newDriver) => {
        const updatedDrivers = [...drivers, newDriver];
        setDrivers(updatedDrivers);
        setFilteredDrivers(updatedDrivers);
    };

    const handleUpdateDriver = (updatedDriver) => {
        const updatedDrivers = drivers.map((driver) =>
            driver.driver_id === updatedDriver.driver_id ? updatedDriver : driver
        );
        setDrivers(updatedDrivers);
        setFilteredDrivers(updatedDrivers);
    };

    const handleDeleteDriver = (driverId) => {
        const updatedDrivers = drivers.filter(
            (driver) => driver.driver_id !== driverId
        );
        setDrivers(updatedDrivers);
        setFilteredDrivers(updatedDrivers);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Driver List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Driver
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Driver Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Avatar</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDrivers.map((driver) => (
                        <tr key={driver.driver_id}>
                            <td>{driver.driver_name}</td>
                            <td>
                                {driver.driver_avaUrl && (
                                    <img
                                        src={driver.driver_avaUrl}
                                        alt="Avatar"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{driver.driver_description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedDriver(driver);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedDriver(driver);
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
            <div className="d-flex justify-content-between align-items-center">
                <span>1-5 of {filteredDrivers.length} results</span>
                <nav>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">First</a></li>
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        <li className="page-item"><a className="page-link" href="#">Last</a></li>
                    </ul>
                </nav>
            </div>
            <AddDriverModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddDriver}
            />
            <UpdateDriverModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                driver={selectedDriver}
                onUpdate={handleUpdateDriver}
            />
            <DeleteDriverModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                driver={selectedDriver}
                onDelete={handleDeleteDriver}
            />
        </div>
    );
};

export default DriverList;