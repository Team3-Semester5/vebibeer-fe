import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
    const navigate = useNavigate();
    const [departure, setDeparture] = useState('Đà Nẵng');
    const [destination, setDestination] = useState('Hà Nội');
    const [date, setDate] = useState('2024-06-06');

    const handleSwap = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    };

    const handleSearch = () => {
        // let startPoint = document.getElementById("").value;
        // let endPoint = document.getElementById("").value;
        // let dateStart = document.getElementById("").value;
        navigate('/routeGuest')
    }

    return (
        <div className="container my-4">
            <div className="card p-3 beautiful-search-box">
                <div className="row g-3 align-items-center">
                    <div className="col-md">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nơi xuất phát" value={departure} onChange={(e) => setDeparture(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSwap}>
                                <FontAwesomeIcon icon={faArrowsAltH} />
                            </button>
                        </div>
                    </div>
                    <div className="col-md">
                        <input type="text" className="form-control" placeholder="Nơi đến" value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </div>
                    <div className="col-md">
                        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;