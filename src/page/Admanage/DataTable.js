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
import "../../assets/css/NavbarAd.css";

// Đăng ký các components cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Component hiển thị bảng dữ liệu
function DataTable() {
  const [driverCount, setDriverCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [revenue, setRevenue] = useState(1000000); // Giá trị mặc định của revenue
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Lấy số lượng tài xế
        const driverResponse = await fetch("http://localhost:8080/drivers/");
        if (!driverResponse.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const driverData = await driverResponse.json();
        setDriverCount(driverData.length);

        // Lấy số lượng xe buýt
        const busResponse = await fetch("http://localhost:8080/cars/");
        if (!busResponse.ok) {
          throw new Error("Failed to fetch buses");
        }
        const busData = await busResponse.json();
        setBusCount(busData.length);
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
      style={{ fontSize: "1em", width: "100%", marginLeft: "100px" }}
    >
      <thead>
        <tr>
          <th style={{ fontSize: "1em" }}>Indicators</th>
          <th style={{ fontSize: "1em" }}>Number</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="2" style={{ fontSize: "1em" }}>
              Error: {error}
            </td>
          </tr>
        ) : (
          <>
            <tr>
              <td style={{ fontSize: "1em" }}>Number of drivers</td>
              <td style={{ fontSize: "1em" }}>{driverCount}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1em" }}>Number of buses</td>
              <td style={{ fontSize: "1em" }}>{busCount}</td>
            </tr>
            <tr>
              <td style={{ fontSize: "1em" }}>Revenue</td>
              <td style={{ fontSize: "1em" }}>{revenue}</td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
}

// Component biểu đồ cột
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
        label: "Company A",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 62, 53, 48, 75],
      },
      {
        label: "Company B",
        backgroundColor: "rgba(192,75,192,0.4)",
        borderColor: "rgba(192,75,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(192,75,192,0.6)",
        hoverBorderColor: "rgba(192,75,192,1)",
        data: [50, 45, 70, 75, 55, 60, 35, 65, 58, 50, 42, 68],
      },
      {
        label: "Company C",
        backgroundColor: "rgba(192,192,75,0.4)",
        borderColor: "rgba(192,192,75,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(192,192,75,0.6)",
        hoverBorderColor: "rgba(192,192,75,1)",
        data: [45, 55, 65, 70, 50, 48, 30, 60, 52, 45, 40, 62],
      },
      {
        label: "Company D",
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,75,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,75,192,0.6)",
        hoverBorderColor: "rgba(75,75,192,1)",
        data: [60, 50, 75, 80, 65, 58, 38, 68, 60, 55, 48, 72],
      },
      {
        label: "Company E",
        backgroundColor: "rgba(192,75,75,0.4)",
        borderColor: "rgba(192,75,75,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(192,75,75,0.6)",
        hoverBorderColor: "rgba(192,75,75,1)",
        data: [55, 60, 72, 78, 58, 52, 33, 62, 56, 50, 44, 70],
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
    plugins: {
      legend: {
        position: "top",
      },
    },
    barThickness: 8, // Độ dày của mỗi cột
    categorySpacing: 20, // Khoảng cách giữa các nhóm
  };

  return (
    <div style={{ height: "800px", width: "1000px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

// Component bảng top 5 nhà xe có doanh thu cao nhất
const TopBusCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/top-bus-companies");
        if (!response.ok) {
          throw new Error("Failed to fetch bus companies");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Table
      striped
      bordered
      hover
      className="w-100 ml-5"
      style={{ fontSize: "1em", width: "80%", marginLeft: "10px" }}
    >
      <thead>
        <tr>
          <th style={{ fontSize: "1em" }}>Rank</th>
          <th style={{ fontSize: "1em" }}>Company Name</th>
          <th style={{ fontSize: "1em" }}>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="3" style={{ fontSize: "1em" }}>
              Error: {error}
            </td>
          </tr>
        ) : (
          companies.map((company, index) => (
            <tr key={index}>
              <td style={{ fontSize: "1em" }}>{index + 1}</td>
              <td style={{ fontSize: "1em" }}>{company.name}</td>
              <td style={{ fontSize: "1em" }}>{company.revenue}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

// Component bảng top 5 khách hàng book vé nhiều nhất
const TopCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8080/top-customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Table
      striped
      bordered
      hover
      className="w-100 ml-5"
      style={{ fontSize: "1em", width: "80%", marginLeft: "10px" }}
    >
      <thead>
        <tr>
          <th style={{ fontSize: "1em" }}>Rank</th>
          <th style={{ fontSize: "1em" }}>Customer Name</th>
          <th style={{ fontSize: "1em" }}>Bookings</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="3" style={{ fontSize: "1em" }}>
              Error: {error}
            </td>
          </tr>
        ) : (
          customers.map((customer, index) => (
            <tr key={index}>
              <td style={{ fontSize: "1em" }}>{index + 1}</td>
              <td style={{ fontSize: "1em" }}>{customer.name}</td>
              <td style={{ fontSize: "1em" }}>{customer.bookings}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

// Component chính kết hợp cả bảng dữ liệu và các biểu đồ
const MainComponent = () => {
  return (
    <Container>
      <Row style={{ marginLeft: "30px", marginTop: "30px" }}>
        <Col style={{ marginRight: "200px" }}>
          <h3>Data Table</h3>
          <DataTable />
        </Col>
      </Row>
      <Row style={{ marginLeft: "30px", marginTop: "30px" }}>
        <Col>
          <h3>Top 5 Bus Companies by Revenue</h3>
          <TopBusCompanies />
        </Col>
      </Row>
      <Row style={{ marginLeft: "30px", marginTop: "30px" }}>
        <Col>
          <h3>Top 5 Customers by Bookings</h3>
          <TopCustomers />
        </Col>
      </Row>
      <Row style={{ marginLeft: "30px" }}>
        <Col>
          <h3>Revenue of month</h3>
          <BarChart key="bar-chart" />
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;
