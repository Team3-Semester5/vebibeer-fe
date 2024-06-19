import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBusCompanyModal from './AddBusCompanyModal';
import UpdateBusCompanyModal from './UpdateBusCompanyModal';
import DeleteBusCompanyModal from './DeleteBusCompanyModal';

const BusCompanyList = () => {
    const [busCompanies, setBusCompanies] = useState([]);
    const [filteredBusCompanies, setFilteredBusCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('All');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBusCompany, setSelectedBusCompany] = useState(null);

    useEffect(() => {
        const fetchBusCompanies = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/buscompanies/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBusCompanies(data);
                setFilteredBusCompanies(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching bus companies:', error);
            }
        };

        fetchBusCompanies();
    }, []);

    useEffect(() => {
        let filtered = busCompanies;

        if (filterBy !== 'All') {
            filtered = busCompanies.filter(busCompany => busCompany.busCompany_status === filterBy);
        }

        if (searchTerm) {
            filtered = filtered.filter(busCompany =>
                busCompany.busCompany_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBusCompanies(filtered);
    }, [searchTerm, filterBy, busCompanies]);

    const handleAddBusCompany = (newBusCompany) => {
        setBusCompanies([...busCompanies, newBusCompany]);
        setFilteredBusCompanies([...busCompanies, newBusCompany]);
    };

    const handleUpdateBusCompany = (updatedBusCompany) => {
        const updatedBusCompanies = busCompanies.map((busCompany) =>
            busCompany.busCompany_id === updatedBusCompany.busCompany_id ? updatedBusCompany : busCompany
        );
        setBusCompanies(updatedBusCompanies);
        setFilteredBusCompanies(updatedBusCompanies);
    };

    const handleDeleteBusCompany = (busCompanyId) => {
        const updatedBusCompanies = busCompanies.filter(
            (busCompany) => busCompany.busCompany_id !== busCompanyId
        );
        setBusCompanies(updatedBusCompanies);
        setFilteredBusCompanies(updatedBusCompanies);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Bus Company List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Bus Company
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select
                        className="form-control"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                    >
                        <option value="All">FILTER BY STATUS</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        {/* Add more filter options as needed */}
                    </select>
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Status</th>
                        <th>Fullname</th>
                        <th>Date of Birth</th>
                        <th>Avatar</th>
                        <th>Description</th>
                        <th>Nationality</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Contract</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{filteredBusCompanies.map((busCompany) => (
                        <tr key={busCompany.busCompany_id}>
                            <td>{busCompany.username}</td>
                            <td>{busCompany.password}</td>
                            <td>{busCompany.busCompany_status}</td>
                            <td>{busCompany.busCompany_fullname}</td>
                            <td>{new Date(busCompany.busCompany_dob).toLocaleDateString()}</td>
                            <td>
                                {busCompany.busCompany_imgUrl && (
                                    <img
                                        src={busCompany.busCompany_imgUrl}
                                        alt="Avatar"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{busCompany.busCompany_description}</td>
                            <td>{busCompany.busCompany_nationality}</td>
                            <td>{busCompany.busCompany_name}</td>
                            <td>{busCompany.busCompany_location}
                                
                            </td>
                            <td>{busCompany.busCompany_contract}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedBusCompany(busCompany);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedBusCompany(busCompany);
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
                <span>1-5 of {filteredBusCompanies.length} results</span>
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
            <AddBusCompanyModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddBusCompany}
            />
            <UpdateBusCompanyModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                busCompany={selectedBusCompany}
                onUpdate={handleUpdateBusCompany}
            />
            <DeleteBusCompanyModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                busCompany={selectedBusCompany}
                onDelete={handleDeleteBusCompany}
            />
        </div>
    );
};

export default BusCompanyList;