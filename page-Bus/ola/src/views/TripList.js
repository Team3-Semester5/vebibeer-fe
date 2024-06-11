import React from "react";

// react-bootstrap components
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
} from "react-bootstrap";

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List bus trips</Card.Title>
                <p className="card-category">
                  " Có thể có 1 vài tuyến đang nghỉ "
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Start point</th>
                      <th className="border-0">End point</th>
                      <th className="border-0">Start time</th>
                      <th className="border-0">End time</th>
                      <th className="border-0">Service</th>
                      <th className="border-0">Car</th>
                      <th className="border-0">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Huấn hoa hồng</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Huấn hoa hồng</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Linh 1 chấm</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Tấn sao</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Nhật 2 chấm</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Đà Nẵng</td>
                      <td>Quảng Bình</td>
                      <td>7 A.M</td>
                      <td>11 A.M</td>
                      <td>Vip</td>
                      <td>Limosine</td>
                      <td>Dũng 3 băng</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {}
        </Row>
      </Container>
    </>
  );
}

export default TableList;
