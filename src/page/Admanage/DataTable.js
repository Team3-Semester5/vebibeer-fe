import React, { useState, useEffect } from "react";
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
  ArcElement
} from "chart.js";
import "../../assets/css/NavbarAd.css";
import { API_URL, API_URL1 } from '../../constaint/fetchApi';

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [topBusCompanies, setTopBusCompanies] = useState(null);
  const [topCustomers, setTopCustomers] = useState(null);
  const [error, setError] = useState(null);  // Added error state
  const now = new Date();
  const year = now.getFullYear();

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const revenueResponse = await fetch(`${API_URL}/admin-manage/get-infor-buscompany?year=${year}`);
        if (!revenueResponse.ok) throw new Error('Network response was not ok');
        const revenue = await revenueResponse.json();
        console.log('Revenue:', revenue);
        setRevenueData({
          labels: revenue.map(item => item.bus_company_name),
          datasets: [
            {
              label: 'Revenue',
              data: revenue.map(item => item.total_revenue),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBookingData = async () => {
      try {
        const bookingResponse = await fetch(`${API_URL}/admin-manage/get-infor-buscompany?year=${year}`);
        if (!bookingResponse.ok) throw new Error('Network response was not ok');
        const bookings = await bookingResponse.json();
        console.log('Bookings:', bookings);
        setBookingData({
          labels: bookings.map(item => item.bus_company_name),
          datasets: [
            {
              label: 'Bookings',
              data: bookings.map(item => item.tickets_sold),
              backgroundColor: 'rgba(192, 75, 75, 0.6)',
            },
          ],
        });
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTopBusCompanies = async () => {
      try {
        const topBusCompaniesResponse = await fetch(`${API_URL}/admin-manage/get-top-5-buscompany?year=${year}`);
        if (!topBusCompaniesResponse.ok) throw new Error('Network response was not ok');
        const topBusCompaniesData = await topBusCompaniesResponse.json();
        console.log('Top Bus Companies:', topBusCompaniesData);
        setTopBusCompanies(topBusCompaniesData);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTopCustomers = async () => {
      try {
        const topCustomersResponse = await fetch(`${API_URL}/admin-manage/get-top-5-customer`);
        if (!topCustomersResponse.ok) throw new Error('Network response was not ok');
        const topCustomersData = await topCustomersResponse.json();
        console.log('Top Customers:', topCustomersData);
        setTopCustomers(topCustomersData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRevenueData();
    fetchBookingData();
    fetchTopBusCompanies();
    fetchTopCustomers();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Container style={{marginTop: 60}}>
      {error && (
        <Row>
          <Col>
            <p>Error: {error}</p>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <h3>Revenue by Bus Company</h3>
          <div style={{ height: "400px", width: "100%" }}>
            {revenueData ? <Bar data={revenueData} options={chartOptions} /> : <p>Loading...</p>}
          </div>
        </Col>
        <Col md={6}>
          <h3>Bookings by Bus Company</h3>
          <div style={{ height: "400px", width: "100%" }}>
            {bookingData ? <Bar data={bookingData} options={chartOptions} /> : <p>Loading...</p>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Top 5 Bus Companies by Revenue</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Company Name</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topBusCompanies ? (
                topBusCompanies.map((company, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{company.bus_company_name}</td>
                    <td>{company.total_revenue}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">Loading...</td></tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Top 5 Customers by Bookings</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Customer Name</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers ? (
                topCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.customer_fullname}</td>
                    <td>{customer.number_of_tickets_purchased}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">Loading...</td></tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;