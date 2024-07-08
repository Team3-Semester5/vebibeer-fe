import React, { useEffect, useState } from "react";

import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8080/route/');
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    const filtered = routes.filter(route =>
      route.startLocation.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endLocation.location_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
  }, [searchTerm, routes]);

  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const indexOfLastRoute = currentPage * itemsPerPage;
  const indexOfFirstRoute = indexOfLastRoute - itemsPerPage;
  const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'flex-end'  // This will align the pagination to the right
  };

  return (
    <div>
      <Container fluid>
        <Row style={{marginTop: 100,  }}>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Bus Trips</Card.Title>
                <p className="card-category">"Có thể có 1 vài tuyến đang nghỉ"</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {error && <p className="text-danger">Error: {error}</p>}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Start Point</th>
                      <th>End Point</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Service</th>
                      <th>Car</th>
                      <th>Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRoutes.map(route => (
                      <tr key={route.route_id}>
                        <td>{route.route_id}</td>
                        <td>{route.startLocation.location_name}</td>
                        <td>{route.endLocation.location_name}</td>
                        <td>{new Date(route.route_startTime).toLocaleString()}</td>
                        <td>{new Date(route.route_endTime).toLocaleString()}</td>
                        <td>{route.policy}</td>
                        <td>{route.car.car_code}</td>
                        <td>{route.driver.driver_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={paginationStyle}>
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(1)}>First</button>
                      </li>
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>Last</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TableList;