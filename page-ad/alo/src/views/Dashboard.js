import React from "react";
import ChartistGraph from "react-chartist";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card- category">Number of user</p>
                      <Card.Title as="h5">559</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
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
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h5">1,233,400,000 đồng</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
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
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of bus</p>
                      <Card.Title as="h5">35</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
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
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        Total number of user visits page
                      </p>
                      <Card.Title as="h4">+4K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Doanh thu các nhà xe theo tháng{" "}
                </Card.Title>
                <p className="card-category">Revenue of month</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          695,
                        ],
                        [
                          312, 343, 180, 480, 653, 253, 200, 464, 268, 510, 536,
                          495,
                        ],
                        [
                          443, 563, 257, 865, 124, 273, 100, 234, 310, 390, 436,
                          295,
                        ],
                        [
                          212, 343, 580, 380, 253, 373, 500, 164, 368, 310, 336,
                          595,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Hạnh Luyến <i className="fas fa-circle text-danger"></i>
                  Phương Trang<i className="fas fa-circle text-warning"></i>
                  Bình Minh<i className="fas fa-circle text-new-purple"></i>
                  Khanh Phong <i className="fas fa-circle text-success"></i>
                  Green Bus
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6" className="equal-height">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Top 5 highest revenue on the web
                </Card.Title>
                <p className="card-category">Latest monthly statistics</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["23%", "22%", "18%", "15%", "12%", "10%"],
                      series: [23, 22, 18, 15, 12, 10],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Hạnh luyến <i className="fas fa-circle text-danger"></i>
                  Phương Trang <i className="fas fa-circle text-warning"></i>
                  Bình Minh <i className="fas fa-circle text-new-purple"></i>
                  Khanh Phong <i className="fas fa-circle text-success"></i>
                  Green Bus <i className="fas fa-circle text-primary"></i>
                  Other bus company
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Update 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" className="equal-height">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Top 5 customers book the most tickets
                </Card.Title>
                <p className="card-category">Latest monthly statistics</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["23%", "22%", "18%", "15%", "12%", "10%"],
                      series: [23, 22, 18, 15, 12, 10],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tấn Dũng <i className="fas fa-circle text-danger"></i>
                  Tuấn Cường <i className="fas fa-circle text-warning"></i>
                  Hiếu Linh <i className="fas fa-circle text-new-purple"></i>
                  Đức Tấn <i className="fas fa-circle text-success"></i>
                  Văn Nhật <i className="fas fa-circle text-primary"></i>
                  Other customer
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Update 1 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
