import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVoucherModal from './AddVoucherModal';
import UpdateVoucherModal from './UpdateVoucherModal';
import DeleteVoucherModal from './DeleteVoucherModal';
import { useNavigate } from "react-router-dom";

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [vouchersPerPage] = useState(5);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role_user !== 'ROLE_BUSCOMPANY') {
            navigate("/login");
        }
        const fetchVouchers = async () => {
            console.log(JSON.stringify(user));
            try {
                const response = await fetch(`http://localhost:8080/buscompany/voucher/bus/${user.busCompany_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setVouchers(data);
                setFilteredVouchers(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching vouchers:', error);
            }
        };

        fetchVouchers();
    }, []);

    useEffect(() => {
        let filtered = vouchers;

        if (searchTerm) {
            filtered = filtered.filter(voucher =>
                voucher.voucher_code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredVouchers(filtered);
    }, [searchTerm, vouchers]);

    const handleAddVoucher = (newVoucher) => {
        const updatedVouchers = [...vouchers, newVoucher];
        setVouchers(updatedVouchers);
        setFilteredVouchers(updatedVouchers);
    };

    const handleUpdateVoucher = (updatedVoucher) => {
        const updatedVouchers = vouchers.map((voucher) =>
            voucher.voucher_code === updatedVoucher.voucher_code ? updatedVoucher : voucher
        );
        setVouchers(updatedVouchers);
        setFilteredVouchers(updatedVouchers);
    };

    const handleDeleteVoucher = (voucherCode) => {
        const updatedVouchers = vouchers.filter(
            (voucher) => voucher.voucher_code !== voucherCode
        );
        setVouchers(updatedVouchers);
        setFilteredVouchers(updatedVouchers);
    };

    const indexOfLastVoucher = currentPage * vouchersPerPage;
    const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
    const currentVouchers = filteredVouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        setCurrentPage(current => Math.min(current + 1, Math.ceil(filteredVouchers.length / vouchersPerPage)));
    };

    const prevPage = () => {
        setCurrentPage(current => Math.max(current - 1, 1));
    };
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
    return (
        <div className="container mt-4 buscompany">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Voucher List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Voucher
                </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Voucher Code"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Voucher Code</th>
                        <th>Discount</th>
                        <th>startTime</th>
                        <th>endTIme</th>
                        <th>Discount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVouchers.map(voucher => (
                        <tr key={voucher.voucher_code}>
                            <td>{voucher.voucher_code}</td>
                            <td>{voucher.saleUp}%</td> 
                            <td>{formatDateTime(voucher.startTime)}</td> 
                            <td>{formatDateTime(voucher.endTime)}</td>
                            <td>{voucher.voucher_condition}</td>   
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedVoucher(voucher);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedVoucher(voucher);
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
                <span>{indexOfFirstVoucher + 1}-{Math.min(indexOfLastVoucher, filteredVouchers.length)} of {filteredVouchers.length} results</span>
                <nav>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => handlePageChange(1, e)}>First</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => prevPage(e)}>Previous</a></li>
                        {Array.from({ length: Math.ceil(filteredVouchers.length / vouchersPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={(e) => handlePageChange(i + 1, e)}>{i + 1}</a>
                            </li>
                        ))}
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => nextPage(e)}>Next</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => handlePageChange(Math.ceil(filteredVouchers.length / vouchersPerPage), e)}>Last</a></li>
                    </ul>
                </nav>
            </div>
            <AddVoucherModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddVoucher}
            />
            <UpdateVoucherModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                voucher={selectedVoucher}  // Fixed typo from selectedVaccine to selectedVoucher
                onUpdate={handleUpdateVoucher}
            />
            <DeleteVoucherModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                voucher={selectedVoucher}
                onDelete={handleDeleteVoucher}
            />
        </div>
    );
};

export default VoucherList;