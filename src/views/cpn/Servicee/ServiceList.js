import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddServiceModal from './AddServiceModal';
import UpdateServiceModal from './UpdateServiceModal';
import DeleteServiceModal from './DeleteServiceModal';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/services/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data);
                setFilteredServices(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        let filtered = services;

        if (searchTerm) {
            filtered = filtered.filter(service =>
                service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredServices(filtered);
    }, [searchTerm, services]);

    const handleAddService = (newService) => {
        setServices([...services, newService]);
        setFilteredServices([...services, newService]);
    };

    const handleUpdateService = (updatedService) => {
        const updatedServices = services.map((service) =>
            service.service_id === updatedService.service_id ? updatedService : service
        );
        setServices(updatedServices);
        setFilteredServices(updatedServices);
    };

    const handleDeleteService = (serviceId) => {
        const updatedServices = services.filter(
            (service) => service.service_id !== serviceId
        );
        setServices(updatedServices);
        setFilteredServices(updatedServices);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Service List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Service
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Service Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Logo</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredServices.map((service) => (
                        <tr key={service.service_id}>
                            <td>{service.service_name}</td>
                            <td>
                                {service.service_logoUrl && (
                                    <img
                                        src={service.service_logoUrl}
                                        alt="Logo"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{service.service_description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedService(service);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedService(service);
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
                <span>1-5 of {filteredServices.length} results</span>
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
            <AddServiceModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddService}
            />
            <UpdateServiceModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                service={selectedService}
                onUpdate={handleUpdateService}
            />
            <DeleteServiceModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                service={selectedService}
                onDelete={handleDeleteService}
            />
        </div>
    );
};

export default ServiceList;