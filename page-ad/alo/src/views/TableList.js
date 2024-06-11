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
                <Card.Title as="h4">List nhà xe đang hoạt động</Card.Title>
                <p className="card-category">
                  " Có thể có 1 vài nhà xe k còn hoạt động "
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Revenue</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Phương Trang</td>
                      <td>209,400,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Hà Nội</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Bình Minh</td>
                      <td>230,700,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Tp Hồ Chí Minh</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Khanh Phong</td>
                      <td>400,500,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Đà Nẵng</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Green Bus</td>
                      <td>323,300,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Hải Phòng</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Liên Hưng</td>
                      <td>312,200,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Cần Thơ</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Hạnh Luyến</td>
                      <td>630,200,000 đồng</td>
                      <td>Việt Nam</td>
                      <td>Quảng Bình</td>
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
