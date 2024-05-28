import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCustomerModal from '../component/Customer/AddCustomerModal';
import UpdateCustomerModal from '../component/Customer/UpdateCustomerModal';
import DeleteCustomerModal from '../component/Customer/DeleteCustomerModal';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('All');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:8080/customer');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCustomers(data);
                setFilteredCustomers(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        let filtered = customers;

        if (filterBy !== 'All') {
            filtered = customers.filter(customer => customer.typeCustomer.typeCustomer_name === filterBy); // Replace `author` with the actual field to filter by
        }

        if (searchTerm) {
            filtered = filtered.filter(customer =>
                customer.customer_fullname.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredCustomers(filtered);
    }, [searchTerm, filterBy, customers]);

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setFilteredCustomers([...customers, newCustomer]);
    };

    const handleUpdateCustomer = (updatedCustomer) => {
        const updatedCustomers = customers.map((customer) =>
            customer.customer_id === updatedCustomer.customer_id ? updatedCustomer : customer
        );
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
    };

    const handleDeleteCustomer = (customerId) => {
        const updatedCustomers = customers.filter(
            (customer) => customer.customer_id !== customerId
        );
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Customer Lists</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Customer
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
                        <option value="All">FILTER BY</option>
                        <option value="normal">normal</option>
                        <option value="silver">silver</option>
                        <option value="gold">gold</option>
                        <option value="platium">platium</option>
                        {/* Add more filter options as needed */}
                    </select>
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dob</th>
                        <th>Description</th>
                        <th>nationality</th>
                        <th>gender</th>
                        <th>IsPurchased</th>
                        <th>Type Customer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_fullname}</td>
                            <td>{new Date(customer.customer_dob).toLocaleString()}</td>
                            <td>{customer.customer_description}</td>
                            <td>{customer.customer_nationality}</td>
                            <td>{customer.customer_gender}</td>
                            <td>{customer.verify_purchased.toLocaleString()}</td>
                            <td>{customer.typeCustomer.typeCustomer_name}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedCustomer(customer);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedCustomer(customer);
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
                <span>1-5 of {filteredCustomers.length} results</span>
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
            <AddCustomerModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddCustomer}
            />
            <UpdateCustomerModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                customer={selectedCustomer}
                onUpdate={handleUpdateCustomer}
            />
            <DeleteCustomerModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                customer={selectedCustomer}
                onDelete={handleDeleteCustomer}
            />
        </div>
    );
};

export default CustomerList;