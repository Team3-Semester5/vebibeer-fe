import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/namepage.png";
import "../assets/css/NavbarAd.css";
import Menu from "../component/Menu";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user ? user.customer_id : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (userId !== null) {
        try {
          const response = await fetch(
            `http://localhost:8080/transaction/customer/${userId}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTransactions(data);
          setFilteredTransactions(data); // Initialize filtered transactions
        } catch (error) {
          setError("Error fetching transaction data");
          console.error("Error fetching transaction data:", error);
        }
      }
    };
    fetchTransactions();
  }, [userId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction[3]);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    });
    setFilteredTransactions(filtered);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredTransactions(transactions);
  };

  return (
    <div>
      {/* <nav className="navbar">
        <Link to="#" onClick={() => navigate(-1)}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <ul>
          <li>
            <button
              style={{
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff", // Blue color
                color: "white", // White text
                border: "none", // No border
                borderRadius: "5px", // Rounded corners
              }}
              onClick={() => {}}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav> */}
      <Menu></Menu>

      <Container className="py-5" style={{ marginTop: "50px" }}>
        <h1>Transaction History</h1>
        {error && (
          <Alert variant="danger">
            <strong>Error:</strong> {error}
          </Alert>
        )}
        <Form
          onSubmit={handleSearch}
          style={{ marginBottom: "50px", marginTop: "30px" }}
        >
          <Row>
            <Col md={4}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: " 30px" }}
              >
                Search
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleReset}
                className="ml-2"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Bus Company Name</th>
              <th>status</th>
              <th>Transaction Date</th>
              <th>User Points</th>
              <th>Voucher Sale Up</th>
              <th>Ticket Price</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => {
              const totalAmount = transaction[10];
              const formattedAmount =
                totalAmount === 0 ? totalAmount : `-${Math.abs(totalAmount)}`;

              return (
                <tr key={index}>
                  <td>{transaction[0]}</td>
                  <td>{transaction[1]}</td>
                  <td>{transaction[2]}</td>
                  <td>{transaction[4]}</td>
                  <td>{new Date(transaction[3]).toLocaleString()}</td>
                  <td>{transaction[5]}</td>
                  <td>{transaction[7]}</td>
                  <td>{transaction[6]}</td>
                  <td>{transaction[8]}</td>
                  <td style={{ color: totalAmount !== 0 ? "red" : "inherit" }}>
                    {formattedAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <footer
        className="footer px-0 px-lg-3"
        style={{
          left: "0",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #ccc",
          padding: "10px 0",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <Container fluid>
          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="text-right">
              © {new Date().getFullYear()}{" "}
              <a href="#" style={{ color: "#007bff" }}>
                Vebibeer
              </a>{" "}
              made with love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
