import React, { useEffect, useState } from 'react';
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

function CompanyCustomers({ companyId }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/admin/buscompanies/${companyId}/customer`)
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error:', error));
    }, [companyId]);

    return (
        <div>
            <h2>Customers</h2>
            {customers.length ? (
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>{customer.fullname} - {customer.username}</li>
                    ))}
                </ul>
            ) : <p>No customers found.</p>}
        </div>
    );
}

export default CompanyCustomers;