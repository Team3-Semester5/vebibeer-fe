import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddLocationModal from './AddLocationModal';
import UpdateLocationModal from './UpdateLocationModal';
import DeleteLocationModal from './DeleteLocationModal';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/locations/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setLocations(data);
                setFilteredLocations(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        let filtered = locations;

        if (searchTerm) {
            filtered = filtered.filter(location =>
                location.location_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredLocations(filtered);
    }, [searchTerm, locations]);

    const handleAddLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
        setFilteredLocations([...locations, newLocation]);
    };

    const handleUpdateLocation = (updatedLocation) => {
        const updatedLocations = locations.map((location) =>
            location.location_id === updatedLocation.location_id ? updatedLocation : location
        );
        setLocations(updatedLocations);
        setFilteredLocations(updatedLocations);
    };

    const handleDeleteLocation = (locationId) => {
        const updatedLocations = locations.filter(
            (location) => location.location_id !== locationId
        );
        setLocations(updatedLocations);
        setFilteredLocations(updatedLocations);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Location List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Location
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Location Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Logo</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLocations.map((location) => (
                        <tr key={location.location_id}>
                            <td>{location.location_name}</td>
                            <td>
                                {location.location_imgUrl && (
                                    <img
                                        src={location.location_imgUrl}
                                        alt="Logo"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{location.location_description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedLocation(location);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedLocation(location);
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
                <span>1-5 of {filteredLocations.length} results</span>
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
            <AddLocationModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddLocation}
            />
            <UpdateLocationModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                location={selectedLocation}
                onUpdate={handleUpdateLocation}
            />
            <DeleteLocationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                location={selectedLocation}
                onDelete={handleDeleteLocation}
            />
        </div>
    );
};

export default LocationList;