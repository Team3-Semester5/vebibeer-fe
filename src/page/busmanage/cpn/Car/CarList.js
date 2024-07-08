import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCarModal from './AddCarModal';
import UpdateCarModal from './UpdateCarModal';
import DeleteCarModal from './DeleteCarModal';
import '../../../../assets/css/Buscompany.css';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('All');
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/buscompany/car');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        let filtered = cars;

        if (filterBy !== 'All') {
            filtered = cars.filter(car => car.car_manufacturer === filterBy);
        }

        if (searchTerm) {
            filtered = filtered.filter(car => car.car_code.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredCars(filtered);
    }, [searchTerm, filterBy, cars]);

    const handleAddCar = (newCar) => {
        setCars([...cars, newCar]);
        setFilteredCars([...cars, newCar]);
    };

    const handleUpdateCar = (updatedCar) => {
        const updatedCars = cars.map((car) =>
            car.car_id === updatedCar.car_id ? updatedCar : car
        );
        setCars(updatedCars);
        setFilteredCars(updatedCars);
    };

    const handleDeleteCar = (carId) => {
        const updatedCars = cars.filter(car => car.car_id !== carId);
        setCars(updatedCars);
        setFilteredCars(updatedCars);
    };

    const lastPageIndex = currentPage * itemsPerPage;
    const firstPageIndex = lastPageIndex - itemsPerPage;
    const currentCars = filteredCars.slice(firstPageIndex, lastPageIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    return (
        <div className="container mt-4 buscompany" >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Bus List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Car
                </button>
            </div>
            {/* Search and Filter Inputs */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Car Code"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            {/* Car Table */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Car Code</th>
                        <th>Amount of Seats</th>
                        <th>Images</th>
                        <th>Manufacturer</th>
                        <th>Bus Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCars.map((car) => (
                        <tr key={car.car_id}>
                            <td>{car.car_code}</td>
                            <td>{car.amount_seat}</td>
                            {/* Image cells consolidated for brevity */}
                            <td><img src={car.car_imgUrl1} alt="Car Image" style={{ width: '50px' }} /></td>
                            <td>{car.car_manufacturer}</td>
                            <td>{car.busCompany ? car.busCompany.busCompany_name : 'N/A'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setSelectedCar(car);
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
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(1); }}>First</a>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage - 1); }}>Previous</a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">{currentPage}</a></li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage + 1); }}>Next</a>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(totalPages); }}>Last</a>
                    </li>
                </ul>
            </nav>
            <div className="d-flex justify-content-end">
                <span>{firstPageIndex + 1}-{lastPageIndex} of {filteredCars.length} results</span>
            </div>
            <AddCarModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAdd={handleAddCar}
            />
            <UpdateCarModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                car={selectedCar}
                onUpdate={handleUpdateCar}
            />
            <DeleteCarModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                car={selectedCar}
                onDelete={handleDeleteCar}
            />
        </div>
    );
};

export default CarList;