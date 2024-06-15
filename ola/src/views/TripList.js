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

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/routes/');
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

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Bus Trips</Card.Title>
                <p className="card-category">" Có thể có 1 vài tuyến đang nghỉ "</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {error && <p className="text-danger">Error: {error}</p>}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Start Point</th>
                      <th className="border-0">End Point</th>
                      <th className="border-0">Start Time</th>
                      <th className="border-0">End Time</th>
                      <th className="border-0">Service</th>
                      <th className="border-0">Car</th>
                      <th className="border-0">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map(route => (
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;