import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ShowMore from './ShowMore';
import { Modal, Button } from 'react-bootstrap';

const ReviewC = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();
    // Fetching customer data
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        if (user?.role_user != 'ROLE_BUSCOMPANY') {
            navigate("/login");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/transaction/buscompany/${user.busCompany_id}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTransactions(data);
                    setFilteredTransactions(data);
                } else {
                    console.error('Expected an array of customers, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user?.busCompany_id, navigate, user?.role_user]);

    useEffect(() => {
        if (user?.role_user != 'ROLE_BUSCOMPANY') {
            navigate("/login");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/manageBus/${user.busCompany_id}/get-infor-buscompany`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCustomers(data);
                    setFilteredCustomers(data);
                } else {
                    console.error('Expected an array of customers, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user?.busCompany_id, navigate, user?.role_user]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Slice data for pagination
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle showing more customer details
    const handleShowMore = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleAccept = async (transaction) => {
        console.log('Accept', JSON.stringify(transaction));
        const response = await fetch("http://localhost:8080/transaction/customer/confirm", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        console.log(data);
        // Reload the page after accepting
        window.location.reload(); // Thêm dòng này để tải lại trang sau khi chấp nhận
    };

    const handleReject = async (transaction) => {
        console.log('Reject', JSON.stringify(transaction));
        // Implement the reject functionality here
    };

    const handleOpenAcceptModal = (transaction) => {
        setSelectedTransaction(transaction);
        setShowAcceptModal(true);
    };

    const handleOpenRejectModal = (transaction) => {
        setSelectedTransaction(transaction);
        setShowRejectModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const ActionModal = ({ show, onHide, transaction, onConfirm, title }) => {
        // Việt hóa tiêu đề dựa theo hành động
        const vietnameseTitle = title === 'Accept' ? 'Accept' : 'reject';

        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to {vietnameseTitle} this transaction for {transactions.customerFullName}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={title === 'Accept' ? 'success' : 'danger'} onClick={onConfirm}>
                        {title}
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const filterTransaction = transactions.filter(transaction => transaction.transactionStatus === 'Pending');

    const formatDateTime = (dateTimeString) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('vi-VN', options);
    };

    const formatDateTime1 = (dateTimeString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('vi-VN', options);
    };
    function formatNumber(number) {
        return new Intl.NumberFormat('vi-VN').format(number);
    }
    return (
        <div className="container mt-4">
            <h1>Customer List</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Customer Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date of birth</th>
                        <th>Gender</th>
                        <th>Description</th>
                        <th>Nationality</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.customerId}</td>
                            <td>{customer.username}</td>
                            <td>{formatDateTime1(customer.customerDOB)}</td>
                            <td>{customer.customerGender}</td>
                            <td>{customer.customerDescription}</td>
                            <td>{customer.customerNationality}</td>
                            <td>{customer.transactionStatus}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleShowMore(customer)}
                                >
                                    Show Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
                <span>{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} results</span>
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(1)}>First</button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                        </li>
                        {[...Array(Math.ceil(filteredCustomers.length / itemsPerPage))].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(filteredCustomers.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        </li>
                        <li className={`page-item ${currentPage === Math.ceil(filteredCustomers.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(Math.ceil(filteredCustomers.length / itemsPerPage))}>Last</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <>
                <div>
                    <h2>Transaction</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Transaction date</th>
                                <th>Full name</th>
                                <th>Payment method</th>
                                <th>Total amount</th>
                                <th>Number of seats</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTransaction.map(transactions => (
                                <tr key={transactions.id}>
                                    <td>{transactions.transactionId}</td>
                                    <td>{transactions.transactionStatus}</td>
                                    <td>{formatDateTime(transactions.transactionTimeEdit)}</td>
                                    <td>{transactions.customerFullName}</td>
                                    <td>{transactions.paymentMethodName}</td>
                                    <td>{formatNumber(transactions.ticketPrice)}</td>
                                    <td>{transactions.ticketSeat}</td>
                                    <td>{transactions.carName}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => handleOpenAcceptModal(transactions)}>Accept</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleOpenRejectModal(transactions)}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>

            {showModal && (
                <ShowMore
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    customer={selectedCustomer}
                />
            )}
            <ActionModal
                show={showAcceptModal}
                onHide={handleCloseAcceptModal}
                transaction={selectedTransaction}
                onConfirm={() => {
                    console.log('Accepted:', selectedTransaction);
                    handleAccept(selectedTransaction);
                    handleCloseAcceptModal(); // Close modal after confirming
                }}
                title="Accept"
            />
            <ActionModal
                show={showRejectModal}
                onHide={handleCloseRejectModal}
                transaction={selectedTransaction}
                onConfirm={() => {
                    console.log('Rejected:', selectedTransaction);
                    handleReject(selectedTransaction);
                    handleCloseRejectModal(); // Close modal after confirming
                }}
                title="Reject"
            />
        </div>
    );
};

export default ReviewC;
