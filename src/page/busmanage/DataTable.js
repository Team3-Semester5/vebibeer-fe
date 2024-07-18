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
import { useNavigate } from "react-router-dom";
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

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
  const [ticketsSold, setTicketsSold] = useState(0);
  const [error, setError] = useState(null);
  const [revenueYear, setRevenueYear] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role_user != 'ROLE_BUSCOMPANY') {
      navigate("/login");
    }
    const fetchCounts = async () => {
      try {
        // Fetching driver count
        const driverResponse = await fetch(
          `${API_URL}/buscompany/driver/by-company/1`
        );
        if (!driverResponse.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const driverData = await driverResponse.json();
        setDriverCount(driverData.length); // Assuming driverData is an array

        // Fetching bus count
        const busResponse = await fetch(`${API_URL}/buscompany/car/by-company/1`);
        if (!busResponse.ok) {
          throw new Error("Failed to fetch buses");
        }
        const busData = await busResponse.json();
        setBusCount(busData.length); // Assuming busData is an array

        // Fetching number of tickets sold
        var now = new Date();
        var currentMonth = now.getMonth() + 1;
        var currentYear = now.getFullYear();
        const ticketsResponse = await fetch(`${API_URL}/manageBus/${user.busCompany_id}?year=${currentYear}&month=${currentMonth}`);
        if (!ticketsResponse.ok) {
          throw new Error("Failed to fetch ticket sales information");
        }
        const ticketsData = await ticketsResponse.json();
        if (ticketsData.length > 0) {
          setTicketsSold(ticketsData[0].amount_tickets);
        }

        const revenueResponse = await fetch(`${API_URL}/manageBus/revenue/${user.busCompany_id}?year=${currentYear}`);
        if (!revenueResponse.ok) {
          throw new Error("Failed to fetch revenue data");
        }
        const revenueData = await revenueResponse.json();
        setRevenueYear(revenueData[0].total_earnings);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Table
      striped
      bordered
      hover
      className="w-100 ml-5"
      style={{
        fontSize: "1.2em",
        width: "85%",
        height: "300px",

      }}
    >
      <thead>
        <tr >
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
              <td style={{ fontSize: "1.2em" }}>{revenueYear}.000 VND</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.2em" }}>Number of buses</td>
              <td style={{ fontSize: "1.2em" }}>{busCount}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.2em" }}>
                Number of tickets sold during the month
              </td>
              <td style={{ fontSize: "1.2em" }}>{ticketsSold}</td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
}

const BarChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(new Array(12).fill(0)); // Initialize with zeros for all months
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const revenues = new Array(12).fill(0); // Temporary storage for revenue data
        var now = new Date();
        var currentMonth = now.getMonth() + 1;
        var currentYear = now.getFullYear();
        // Loop through all months
        // aibiet
        for (let month = 1; month <= 12; month++) {
          const response = await fetch(`${API_URL}/manageBus/${user.busCompany_id}?year=${currentYear}&month=${month}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch revenue data for month: ${month}`);
          }
          const data = await response.json();

          if (data.length > 0 && data[0].hasOwnProperty('amount_tickets')) {
            revenues[month - 1] = data[0].amount_tickets;
          } else {
            console.warn(`No valid revenue data available for month: ${month}`);
          }
        }

        setMonthlyRevenue(revenues);
      } catch (error) {
        console.error("Error fetching monthly revenue data:", error);
      }
    };

    fetchMonthlyRevenue();
  }, []);
  // useEffect(() => {
  //   const fetchMonthlyRevenue = async () => {
  //     try {
  //       const revenues = new Array(12).fill(0); // Temporary storage for revenue data

  //       // Loop through all months
  //       for (let month = 1; month <= 12; month++) {
  //         const response = await fetch(`${API_URL}/api/revenue/1?year=2024&month=${month}`);
  //         if (!response.ok) {
  //           throw new Error(`Failed to fetch revenue data for month: ${month}`);
  //         }
  //         const data = await response.json();
  //         // Assuming the response contains an array of objects and we take the first object
  //         revenues[month - 1] = data[0].total_earnings; // Adjust according to your actual data structure
  //       }

  //       setMonthlyRevenue(revenues);
  //     } catch (error) {
  //       console.error("Error fetching monthly revenue data:", error);
  //     }
  //   };

  //   fetchMonthlyRevenue();
  // }, []);
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenue,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
      <Row className="align-items-start">
        <Col md={4}>
          <h2
            style={{
              marginTop: "100px",
              marginBottom: "40px",
              paddingLeft: "140px",
            }}
          >
            Data Table
          </h2>
          <DataTable />
        </Col>
        <Col md={8} style={{ paddingLeft: "40px" }}>
          <h2 style={{ marginTop: "100px", paddingLeft: "280px" }}>
            Revenue of months
          </h2>
          <BarChart />
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;