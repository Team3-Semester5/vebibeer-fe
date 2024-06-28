import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { 
  Card, 
  Container, 
  Row, 
  Col 
} from "react-bootstrap";

function Dashboard() {
  const [driverCount, setDriverCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching driver count
        const driverResponse = await fetch('http://localhost:8080/drivers/');
        if (!driverResponse.ok) {
          throw new Error('Failed to fetch drivers');
        }
        const driverData = await driverResponse.json();
        setDriverCount(driverData.length); // Assuming driverData is an array

        // Fetching bus count
        const busResponse = await fetch('http://localhost:8080/cars/');
        if (!busResponse.ok) {
          throw new Error('Failed to fetch buses');
        }
        const busData = await busResponse.json();
        setBusCount(busData.length); // Assuming busData is an array
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <Container fluid>
        {error && <p className="text-danger">Error: {error}</p>}
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-user-circle text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of drivers</p>
                      <Card.Title as="h5">{driverCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-money-bill-alt text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue of year</p>
                      <Card.Title as="h5">833,400,000 đồng</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-bus text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of buses</p>
                      <Card.Title as="h5">{busCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fa fa-ticket-alt text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        Number of tickets sold during the month
                      </p>
                      <Card.Title as="h4">500</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Doanh thu các nhà xe theo tháng
                </Card.Title>
                <p className="card-category">Revenue of month</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453,
                          326, 434, 568, 610, 756, 895
                        ]
                      ]
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false
                      },
                      height: "245px"
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            }
                          }
                        }
                      ]
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Hạnh Luyến
                </div>
                <hr />
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;