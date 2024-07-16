import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { API_URL, API_URL1 } from '../../src/constaint/fetchApi';

const SearchBox = () => {
    const navigate = useNavigate();

    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [routes, setRoutes] = useState([]);
    const [pickupPoints, setPickupPoints] = useState([]);
    const [dropoffPoints, setDropoffPoints] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch(`${API_URL}/route`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRoutes(data);
                setPickupPoints([...new Set(data.map(route => route.startLocation.location_name))]);
                setDropoffPoints([...new Set(data.map(route => route.endLocation.location_name))]);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, []);

    const handleSwap = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);

    };

    const handleSearch = () => {
        if (!departure || !destination || !date) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        navigate(`/routeGuest?startCity=${encodeURIComponent(departure)}&endCity=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`);
    };

    return (
        <div className="container my-4">
            <div className="card p-3 beautiful-search-box">
                <div className="row g-3 align-items-center">
                    <div className="col-md">
                        <div className="input-group">
                            <select className="form-control" value={departure} onChange={(e) => setDeparture(e.target.value)}>
                                <option value="">Chọn nơi xuất phát</option>
                                {pickupPoints.map(point => (
                                    <option key={point} value={point}>{point}</option>
                                ))}
                            </select>
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSwap}>
                                <FontAwesomeIcon icon={faArrowsAltH} />
                            </button>
                        </div>
                    </div>
                    <div className="col-md">
                        <select className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}>
                            <option value="">Chọn nơi đến</option>
                            {dropoffPoints.map(point => (
                                <option key={point} value={point}>{point}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <input type="date" class="form-control" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                        {/* <DatePicker className="form-control" minDate={date} value={date} onChange={(e) => setDate(e.target.value)}/> */}
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
