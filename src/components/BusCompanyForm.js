import React, { useState, useEffect } from 'react';
import BusCompanyService from '../services/BusCompanyService';

function BusCompanyForm({ currentId, setCurrentId }) {
    const [busCompany, setBusCompany] = useState({ username: '', buscompany_name: '' });

    useEffect(() => {
        if (currentId !== 0) {
            BusCompanyService.getBusCompanyById(currentId)
                .then(response => {
                    setBusCompany(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [currentId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0) {
            BusCompanyService.createBusCompany(busCompany)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        } else {
            BusCompanyService.updateBusCompany(currentId, busCompany)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBusCompany({ ...busCompany, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={busCompany.username} // Correct variable name here
                onChange={handleInputChange}
                placeholder="Username"
            />
            <input
                type="text"
                name="buscompany_name"
                value={busCompany.buscompany_name} // Correct variable name here
                onChange={handleInputChange}
                placeholder="Company Name"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default BusCompanyForm;