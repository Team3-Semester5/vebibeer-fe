import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusCompanyForm from './BusCompanyForm';

function BusCompanyList() {
  const [busCompanies, setBusCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBusCompany, setCurrentBusCompany] = useState(null);

  useEffect(() => {
    fetchBusCompanies();
  }, []);

  const fetchBusCompanies = async () => {
    const response = await axios.get('http://localhost:8080/api/buscompanies/');
    setBusCompanies(response.data);
  };

  const handleEdit = (busCompany) => {
    setIsEditing(true);
    setCurrentBusCompany(busCompany);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/buscompanies/${id}`);
    fetchBusCompanies();
  };

  return (
    <div>
      {isEditing ? (
        <BusCompanyForm busCompany={currentBusCompany} setBusCompanies={setBusCompanies} setIsEditing={setIsEditing} fetchBusCompanies={fetchBusCompanies} />
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)} className="btn btn-success">Add New BusCompany</button>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Avatar URL</th>
                <th>Description</th>
                <th>Nationality</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Contract Info</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {busCompanies.map(busCompany => (
                <tr key={busCompany.buscompany_id}>
                  <td>{busCompany.username}</td>
                  <td>{busCompany.buscompany_fullname}</td>
                  <td>{busCompany.buscompany_dob}</td>
                  <td>{busCompany.buscompany_ava}</td>
                  <td>{busCompany.buscompany_description}</td>
                  <td>{busCompany.buscompany_nationality}</td>
                  <td>{busCompany.buscompany_name}</td>
                  <td>{busCompany.buscompany_location}</td>
                  <td>{busCompany.buscompany_contract}</td>
                  <td>{busCompany.buscompany_status}</td>
                  <td>
                    <button onClick={() => handleEdit(busCompany)} className="btn btn-info">Edit</button>
                    <button onClick={() => handleDelete(busCompany.buscompany_id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BusCompanyList;