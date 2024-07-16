import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
// import TransactionDetail from './TransactionDetail';
import logo from '../assets/images/namepage.png';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, API_URL1 } from '../constaint/fetchApi';

const TransactionDetail = ({ transaction, onHide }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Transaction Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Start Location:</strong> {transaction.startLocation}</p>
        <p><strong>End Location:</strong> {transaction.endLocation}</p>
        <p><strong>Bus Company:</strong> {transaction.busCompany}</p>
        <p><strong>Total Ticket Price:</strong> {transaction.totalTicketPrice}</p>
        <p><strong>Total Tickets:</strong> {transaction.totalTickets}</p>
        <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
        <p><strong>Transaction Status:</strong> {transaction.transactionStatus}</p>
        <p><strong>Voucher Code:</strong> {transaction.voucherCode}</p>
        <p><strong>Voucher Sale Up:</strong> {transaction.saleUp}</p>
        <p><strong>Points:</strong> {transaction.points}</p>
        <p><strong>Ticket Seats:</strong> {transaction.ticketSeats}</p>
        <p><strong>Route Start Time:</strong> {transaction.routeStartTime}</p>
        <p><strong>Route End Time:</strong> {transaction.routeEndTime}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user ? user.customer_id : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_URL}/transaction/customer/`+userId); // Thay `userId` bằng customerId thực tế
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchTransactions();
  }, [userId]);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleClose = () => {
    setSelectedTransaction(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    sessionStorage.removeItem('user');
    navigate('/'); // Redirect to home page
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <ul>
          <li>
            <button
              style={{
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff', // Blue color
                color: 'white', // White text
                border: 'none', // No border
                borderRadius: '5px', // Rounded corners
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <Container style={{ margin: 100 }}>
        <h2>Transactions</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Total Price</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.startLocation}</td>
                <td>{transaction.endLocation}</td>
                <td>{transaction.totalTicketPrice}</td>
                <td>{transaction.totalTickets}</td>
                <td>
                  <Button variant="primary" onClick={() => handleTransactionClick(transaction)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {selectedTransaction && (
          <TransactionDetail transaction={selectedTransaction} onHide={handleClose} />
        )}
      </Container>
    </div>
  );
};

export default TransactionList;