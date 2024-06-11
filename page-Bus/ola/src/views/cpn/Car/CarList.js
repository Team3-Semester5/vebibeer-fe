import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCarModal from './AddCarModal';
import UpdateCarModal from './UpdateCarModal';
import DeleteCarModal from './DeleteCarModal';

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

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cars/');
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
            filtered = filtered.filter(car =>
                car.car_code.toLowerCase().includes(searchTerm.toLowerCase())
            );
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
        const updatedCars = cars.filter(
            (car) => car.car_id !== carId
        );
        setCars(updatedCars);
        setFilteredCars(updatedCars);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Car List</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add Car
                </button>
            </div>
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
                <div className="form-group">
                    <select
                        className="form-control"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                    >
                        <option value="All">FILTER BY MANUFACTURER</option>
                        {/* Add more filter options as needed */}
                    </select>
                </div>
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Car Code</th>
                        <th>Amount of Seats</th>
                        <th>Image 1</th>
                        <th>Image 2</th>
                        <th>Image 3</th>
                        <th>Image 4</th>
                        <th>Image 5</th>
                        <th>Image 6</th>
                        <th>Manufacturer</th>
                        <th>Bus Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.map((car) => (
                        <tr key={car.car_id}>
                            <td>{car.car_code}</td>
                            <td>{car.car_amount_seat}</td>
                            <td><img src={car.car_img1} alt="Car Image 1" style={{ width: '50px' }} /></td>
                            <td><img src={car.car_img2} alt="Car Image 2" style={{ width: '50px' }} /></td>
                            <td><img src={car.car_img3} alt="Car Image 3" style={{ width: '50px' }} /></td>
                            <td><img src={car.car_img4} alt="Car Image 4" style={{ width: '50px' }} /></td>
                            <td><img src={car.car_img5} alt="Car Image 5" style={{ width: '50px' }} /></td>
                            <td><img src={car.car_img6} alt="Car Image 6" style={{ width: '50px' }} /></td>
                            <td>{car.car_manufacturer}</td>
                            <td>{car.busCompany.buscompany_name}</td>
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
            <div className="d-flex justify-content-between align-items-center">
                <span>1-5 of {filteredCars.length} results</span>
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