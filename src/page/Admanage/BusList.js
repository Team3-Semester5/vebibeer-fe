import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

function BusList() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/routes/`);
        if (!response.ok) {
          throw new Error("Failed to fetch routes");
        }
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <Table
      striped
      bordered
      hover
      style={{ margin: "20px auto", fontSize: "1em", width: "80%" }}
    >
      <caption
        style={{
          captionSide: "top",
          textAlign: "left",
          marginBottom: "10px",
          fontSize: "1.2em",
          fontWeight: "bold",
        }}
      >
        Bus List
      </caption>
      <thead>
        <tr>
          <th style={{ padding: "10px" }}>ID</th>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Revenue</th>
          <th style={{ padding: "10px" }}>Country</th>
          <th style={{ padding: "10px" }}>City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>1</td>
          <td style={{ padding: "10px" }}>Company A</td>
          <td style={{ padding: "10px" }}>$100,000</td>
          <td style={{ padding: "10px" }}>USA</td>
          <td style={{ padding: "10px" }}>New York</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>2</td>
          <td style={{ padding: "10px" }}>Company B</td>
          <td style={{ padding: "10px" }}>$80,000</td>
          <td style={{ padding: "10px" }}>UK</td>
          <td style={{ padding: "10px" }}>London</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </Table>
  );
}

export default BusList;
