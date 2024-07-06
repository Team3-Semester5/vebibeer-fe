import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../../assets/css/Navbar.css";

// Đăng ký các components cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DataTable() {
  const [driverCount, setDriverCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [ticketSold, setTicketSold] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching driver count
        const driverResponse = await fetch("http://localhost:8080/buscompany/driver/");
        if (!driverResponse.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const driverData = await driverResponse.json();
        setDriverCount(driverData.length); // Assuming driverData is an array

        // Fetching bus count
        const busResponse = await fetch("http://localhost:8080/buscompany/car");
        if (!busResponse.ok) {
          throw new Error("Failed to fetch buses");
        }
        const busData = await busResponse.json();
        setBusCount(busData.length); // Assuming busData is an array
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
      
    fetchCounts();
  }, []);

  const calculateTotalRevenue = () => {
    console.log()
  }

  return (
    <Table
      striped
      bordered
      hover
      className="w-100 ml-5"
      style={{ fontSize: "1.2em", width: "80%", marginLeft: "200px",marginTop: "100px" }}
    >
      <thead>
        <tr>
          <th style={{ fontSize: "1.2em" }}>Indicators</th>
          <th style={{ fontSize: "1.2em" }}>Number</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="2" style={{ fontSize: "1.2em" }}>
              Error: {error}
            </td>
          </tr>
        ) : (
          <>
            <tr>
              <td style={{ fontSize: "1.2em" }}>Number of drivers</td>
              <td style={{ fontSize: "1.2em" }}>{driverCount}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.2em" }}>Revenue of year</td>
              <td style={{ fontSize: "1.2em" }}>{}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.2em" }}>Number of buses</td>
              <td style={{ fontSize: "1.2em" }}>{busCount}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.2em" }}>
                Number of tickets sold during the month
              </td>
              <td style={{ fontSize: "1.2em" }}>{}</td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
}

const BarChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 62, 53, 48, 75],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "600px", width: "800px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

// Component chính kết hợp cả bảng dữ liệu và biểu đồ cột
const MainComponent = () => {
  return (
    <Container>
      <Row style={{ marginLeft: "30px" }}>
        <Col style={{ marginRight: "200px" }}>
          <h2>Data Table</h2>
          <DataTable />
        </Col>
      </Row>
      <Row style={{ marginLeft: "30px" }}>
        <Col>
          <h2>Revenue of month</h2>
          <BarChart />
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;
