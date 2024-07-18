import React, { useState } from "react";
import { Row, Col, Form, Button, Container, Collapse } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AboutUss.css";
import Menu from "./Menu";
const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ marginBottom: "10px" }}>
            <Row className="align-items-center">
                <Col md={9} style={{ paddingTop: "10px" }}>
                    <h4
                        style={{
                            color: "rgb(47, 128, 237)",
                            fontSize: "18px",
                            fontWeight: "bold",
                        }}
                    >
                        {question}
                    </h4>
                </Col>
                <Col xs="auto" className="text-right">
                    <Button
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        style={{
                            textAlign: "right",
                            marginLeft: "1200px",
                            paddingLeft: "100px",
                        }}
                    >
                        {open ? (
                            <i className="bi bi-caret-up-fill" style={{ color: "black" }}></i>
                        ) : (
                            <i
                                className="bi bi-caret-down-fill"
                                style={{ color: "black" }}
                            ></i>
                        )}
                    </Button>
                </Col>
            </Row>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <p style={{ whiteSpace: "pre-line", marginTop: "10px  " }}>
                        {answer}
                    </p>
                </div>
            </Collapse>
        </div>
    );
};
const AboutUss = () => {
    return (
        <Container fluid className="bg-container">
            <Menu />
            <Row>
                <Col
                    md={5}
                    className="text-col"
                    style={{
                        marginLeft: "60px",
                        paddingBottom: "80px",
                        paddingLeft: "30px",
                    }}
                >
                    <h1 style={{ fontSize: "3.1rem" }}>
                        Tăng{" "}
                        <span style={{ color: "rgb(255, 216, 41)" }}>
                            30% lượng khách đặt vé
                        </span>{" "}
                        khi mở bán online trên Vebibeer.com ngay hôm nay!
                    </h1>
                    <p style={{ fontSize: "2.5rem" }}>
                        Đăng ký miễn phí và chỉ mất 1 phút để hoàn tất
                    </p>
                </Col>

                <Col
                    md={5}
                    className="form-col"
                    style={{
                        marginTop: "80px",
                        marginRight: "80px",
                        marginLeft: "50px",
                    }}
                >
                    <Form>
                        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
                            Bắt đầu lấp đầy chỗ trống trên xe của bạn với hơn 10 triệu lượt
                            khách đi thành công trên Vebibeer
                        </h3>
                        <Row>
                            <Col>
                                {" "}
                                <Form.Group
                                    controlId="formName"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Form.Control type="text" placeholder="Họ và tên" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group
                                    controlId="formPhone"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Số điện thoại liên hệ"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group
                                    controlId="formEmail"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Form.Control type="email" placeholder="Email" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                {" "}
                                <Form.Group
                                    controlId="formCompany"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Tên hãng xe"
                                        required
                                    />
                                </Form.Group>
                            </Col>{" "}
                        </Row>

                        <Col>
                            {" "}
                            <Form.Group
                                controlId="formCompany"
                                style={{ marginBottom: "20px" }}
                            >
                                <Form.Control type="text" placeholder="Tên hãng xe" required />
                            </Form.Group>
                        </Col>

                        <Form.Group
                            controlId="formCityRoute"
                            style={{ marginBottom: "20px" }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Tỉnh (Thành phố) / Tuyến đường"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="formContent"
                            style={{ marginBottom: "20px" }}
                        >
                            <Form.Control as="textarea" placeholder="Nội dung tư vấn" />
                        </Form.Group>
                        <Button
                            type="submit"
                            className="mt-3"
                            style={{
                                backgroundColor: "#FF4500",
                                borderColor: "#FF4500",
                                width: "200px",
                                padding: "5px",
                                marginLeft: "200px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Đăng kí mở bán
                        </Button>
                    </Form>
                </Col>
            </Row>
            <div className="clearfix"></div>
            <Row
                className="info-section mt-5"
                style={{
                    width: "80%",
                    marginLeft: "130px",
                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.3)",
                }}
            >
                <Row>
                    {" "}
                    <h2 style={{ textAlign: " center" }}>
                        Sàn bán vé xe khách số 1 Việt Nam - Vebibeer.com qua những con số
                    </h2>
                </Row>
                <Col className="info-col" md={3}>
                    <h3>2000 Hãng xe</h3>
                    <p>Đăng ký mở bán vé trên sàn Vebibeer</p>
                </Col>
                <Col className="info-col" md={3}>
                    <h3>5000 Tuyến đường</h3>
                    <p>Đã được mở bán trên sàn Vebibeer</p>
                </Col>
                <Col className="info-col" md={3}>
                    <h3>10 Triệu khách</h3>
                    <p>Đi thành công trên sàn Vebibeer</p>
                </Col>
                <Col className="info-col" md={3}>
                    <h3>5000 Đại lý</h3>
                    <p>
                        Trong và ngoài nước: Momo, Traveloka, Shopee, Lazada, ZaloPay,
                        VnPay, ViettelPay,...
                    </p>
                </Col>
            </Row>
            <div className="clearfix"></div>
            <Row
                style={{
                    marginTop: "90px",
                    marginLeft: "260px",
                    marginBottom: " 60px",
                }}
            >
                <h2 style={{ fontWeight: "bold" }}>
                    Sự an tâm của Chủ nhà xe là ưu tiên hàng đầu của Vebibeer
                </h2>
            </Row>
            <Row>
                <Col style={{ paddingLeft: "280px" }} md={4}>
                    <img
                        width="49"
                        height="48"
                        src="https://bms.vexere.com/wp-content/uploads/2023/06/quan-tam-1.png"
                        class="attachment-large size-large"
                        alt=""
                    ></img>
                </Col>
                <Col style={{ paddingLeft: "320px" }} md={4}>
                    <img
                        width="48"
                        height="48"
                        src="https://bms.vexere.com/wp-content/uploads/2023/06/quan-tam-2.png"
                        class="attachment-large size-large"
                        alt=""
                    ></img>
                </Col>
                <Col style={{ paddingLeft: "320px" }} md={4}>
                    <img
                        width="49"
                        height="48"
                        src="https://bms.vexere.com/wp-content/uploads/2023/06/quan-tam-3.png"
                        class="attachment-large size-large"
                        alt=""
                    ></img>
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col md={3} style={{ marginLeft: "130px", marginRight: "38px" }}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Tỷ lệ khách đặt vé mà không đi qua sàn Vexere rất thấp chỉ 0.2%
                    </p>
                </Col>
                <Col md={3} style={{ marginRight: "38px" }}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Quy trình đối soát, thanh toán công nợ đúng hạn
                    </p>
                </Col>
                <Col md={3}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Được hỗ trợ tận tình từ đội ngũ chuyên viên Vebibeer
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={3} style={{ marginLeft: "130px" }}>
                    <p style={{ textAlign: "center" }}>
                        99.8% khách hàng đặt vé trên sàn Vebibeer là khác thật: 80% khách
                        đặt qua Vebibeer đã trả trước. Nếu khách đặt chỗ thanh toán tiền mặt
                        tại nhà xe, hệ thống của Vebibeer đều xác minh lại thông tin khách
                        đặt. Giúp nhà xe cắt giảm tình trạng đặt ảo giữ ghế mà không đi,
                        không bán được cho khách khác gây thất thoát doanh thu của nhà xe.
                    </p>
                </Col>
                <Col md={3} style={{ marginLeft: "35px", marginRight: "20px" }}>
                    <p style={{ textAlign: "center" }}>
                        Vebibeer sẽ không làm chậm trễ việc thanh toán công nợ của nhà xe
                        bằng bất kỳ cách nào. Nhà xe có thể sử dụng nhiều phương thức thanh
                        toán với Vebibeer như chuyển khoản điện tử và các phương thức khác.
                    </p>
                </Col>
                <Col md={3} style={{ marginLeft: "30px", marginRight: "38px" }}>
                    <p style={{ textAlign: "center" }}>
                        Sau khi hoàn tất quy trình đăng ký mở bán trên Vebibeer, nhà xe
                        không cần lo lắng về dịch vụ và quy trình. Đội ngũ Vebibeer sẽ phụ
                        trách việc hướng dẫn nhà xe kiểm soát quy trình bán vé trực tuyến
                        trong 3 tuần đầu tiên, từ thiết lập dịch vụ mở bán đến thanh toán.
                    </p>
                </Col>
            </Row>
            <Row style={{ marginTop: "45px", paddingLeft: "460px" }}>
                <Col md={3}>
                    <img
                        width="49"
                        height="48"
                        src="https://bms.vexere.com/wp-content/uploads/2023/06/quan-tam-4.png"
                        class="attachment-large size-large"
                        alt=""
                    ></img>
                </Col>
                <Col md={1} style={{ paddingRight: "60px", marginLeft: "280px" }}>
                    <img
                        width="49"
                        height="48"
                        src="https://bms.vexere.com/wp-content/uploads/2023/06/quan-tam-5.png"
                        class="attachment-large size-large"
                        alt=""
                    ></img>
                </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col md={3} style={{ marginLeft: "350px" }}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Nhà xe có thể đăng bán một số lượng tuyến/chuyến/ghế trống nhất định
                        trên sàn Vebibeer
                    </p>
                </Col>
                <Col md={3} style={{ marginLeft: "20px" }}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Sàn bán vé xe khách trực tuyến uy tín, đáng tin cậy{" "}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={3} style={{ marginLeft: "350px" }}>
                    <p style={{ textAlign: "center" }}>
                        Vebibeer không bắt buộc nhà xe bán tất cả các tuyến/chuyến/ghế
                        trống, cam kết bảo mật thông tin nhà xe
                    </p>
                </Col>
                <Col md={3} style={{ marginLeft: "20px" }}>
                    <p style={{ textAlign: "center" }}>
                        Vebibeer là một nền tảng đặt vé xe khách hoạt động từ năm 2024. Hàng
                        triệu hành khách tin tưởng Vebibeer để đặt vé xe khách mỗi năm. Bằng
                        cách đăng ký xe khách trên Vebibeer, bạn sẽ nâng cao uy tín thương
                        hiệu và mở rộng lượng khách hàng của nhà xe.
                    </p>
                </Col>
            </Row>
            <Row
                style={{ marginTop: "25px", marginLeft: "520px", paddingTop: "20px" }}
            >
                <Button
                    style={{
                        backgroundColor: "#F2C92C",
                        width: "330px",
                        height: "50px",
                        color: "#1A1A1A",
                        border: "none",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    Đăng ký mở bán
                </Button>
            </Row>
            <Row
                style={{
                    marginTop: "100px",
                    width: "2000px",
                    height: "1200px",
                    backgroundColor: "#F5F5F5",
                }}
            >
                <Row
                    style={{
                        marginTop: "65px",
                        marginLeft: "380px",
                        marginBottom: "40px",
                    }}
                    className="col-8"
                >
                    <p style={{ fontSize: "35px", fontWeight: "bold" }}>
                        Lợi ích khi mở bán vé tại Vebibeer.com
                    </p>
                </Row>
                <Row style={{ marginBottom: " 80px" }}>
                    <Col
                        md={3}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "15px",
                            marginLeft: "50px",
                        }}
                    >
                        <Row>
                            <Col md={8} style={{ marginLeft: "160px", marginTop: "30px" }}>
                                <img
                                    width="49"
                                    height="48"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/loi-ich-1.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </Col>
                        </Row>
                        <Row>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "48px",
                                    marginTop: "20px",
                                }}
                            >
                                Tăng trưởng 30% doanh thu
                            </p>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center" }}>
                                Vebibeer là một giải pháp toàn diện để bán được nhiều vé trong
                                thời gian ngắn nhờ kênh bán vé với 5000+ đại lý trong và ngoài
                                nước. Với việc tiếp cận nhanh chóng và dễ dàng tới hàng triệu
                                khách hàng, và là thương hiệu đáng tin cậy nhất cho việc đặt vé
                                xe khách trực tuyến, Vebibeer có thể giúp các công ty xe khách
                                bán vé nhanh chóng và tăng trưởng doanh thu.
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={3}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "15px",
                            marginLeft: "60px",
                        }}
                    >
                        <Row>
                            <Col style={{ marginLeft: "160px", marginTop: "29px" }}>
                                <img
                                    width="48"
                                    height="48"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/loi-ich-2.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </Col>
                        </Row>
                        <Row>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "1px",
                                    marginTop: "20px",
                                    textAlign: "center",
                                }}
                            >
                                Cung cấp đầy đủ công cụ giúp nhà xe tăng doanh thu bán vé qua
                                sàn
                            </p>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center" }}>
                                Vebibeer cung cấp công cụ giúp tăng lượng truy cập vào gian hàng
                                của nhà xe trên sàn, hỗ trợ nhà xe tăng lượng khách mua vé bằng
                                những công cụ, chương trình ưu đãi như ưu đãi đặt sớm, ưu đãi
                                phút chót,... Vebibeer cũng cung cấp những đánh giá của khách
                                hàng về độ an toàn, thái độ nhân viên, chất lượng xe,... Những
                                điều đó giúp nhà xe cải thiện và nâng cao chất lượng phục vụ.
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={3}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "15px",
                            marginLeft: "60px",
                        }}
                    >
                        <Row>
                            <Col style={{ marginLeft: "160px", marginTop: "29px" }}>
                                <img
                                    width="49"
                                    height="48"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/loi-ich-3.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </Col>
                        </Row>
                        <Row>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "1px",
                                    marginTop: "20px",
                                    textAlign: "center",
                                }}
                            >
                                Đảm bảo công bằng cho tất cả các nhà xe
                            </p>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center" }}>
                                Vebibeer có thuật toán sắp xếp thứ tự hiển thị của nhà xe dành
                                cho khách trên các tuyến đường dựa vào các tiêu chí nhất định
                                như chất lượng phục vụ của nhà xe, chính sách hủy vé, hình ảnh,
                                cho phép khách thanh toán tại nhà xe,... mà không có sự can
                                thiệp của con người. Vebibeer sẽ ưu tiên giới thiệu cho khách
                                các nhà xe có chất lượng phục vụ tốt.
                            </p>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "290px" }}>
                    <Col
                        md={3}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "15px",
                            marginLeft: "270px",
                        }}
                    >
                        <Row>
                            <Col style={{ marginLeft: "160px", marginTop: "29px" }}>
                                <img
                                    width="48"
                                    height="48"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/loi-ich-4.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </Col>
                        </Row>
                        <Row>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "1px",
                                    marginTop: "20px",
                                    textAlign: "center",
                                }}
                            >
                                Đồng hành trên hành trình thành công của nhà xe
                            </p>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center" }}>
                                Với Vexere, thành công của nhà xe là thành công của chúng tôi.
                                Chúng tôi không chỉ là đối tác kinh doanh, mà còn là người bạn
                                đáng tin cậy trên con đường thành công của nhà xe.Chúng tôi
                                không chỉ cung cấp các công cụ giúp bạn tăng doanh thu, mà còn
                                cung cấp các công cụ giúp nhà xe quản trị thông minh và hiệu quả
                                như phần mềm quản lý bán vé, app quản lý nhà xe, app quản lý tài
                                xế...
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={3}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "15px",
                            marginLeft: "60px",
                        }}
                    >
                        <Row>
                            <Col style={{ marginLeft: "160px", marginTop: "29px" }}>
                                <img
                                    width="48"
                                    height="48"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/loi-ich-5.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </Col>
                        </Row>
                        <Row>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginLeft: "1px",
                                    marginTop: "20px",
                                    textAlign: "center",
                                }}
                            >
                                Chương trình độc quyền từ Vebibeer
                            </p>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center" }}>
                                Nhà xe của bạn sẽ tận hưởng bộ quyền lợi truyền thông từ
                                Vebibeer lên đến 50 triệu đồng, ưu tiên hiển thị trên các trang
                                bán vé của Vebibeer, ưu đãi các sản phẩm trong hệ sinh thái
                                Vebibeer. Để tận hưởng những quyền lợi này, bạn chỉ cần hoàn tất
                                việc đăng ký mở bán vé của mình trên Vebibeer!
                            </p>
                        </Row>
                    </Col>
                </Row>
            </Row>
            <Row
                style={{
                    backgroundColor: "#4F4F4F",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "650px", // Adjust as needed
                    width: "160%", // Ensure it takes full width of the container
                    display: "flex",

                    flexWrap: "wrap",
                }}
            >
                <h2
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        marginTop: "80px",
                        paddingLeft: "400px",
                    }}
                >
                    Đăng ký mở bán theo{" "}
                    <span style={{ color: "skyblue" }}>4 bước đơn giản</span>
                </h2>
                <Row>
                    <Col
                        md={2}
                        style={{
                            backgroundColor: "#FFF",
                            borderRadius: "15px",
                            width: "290px",
                            height: "310px",
                            marginLeft: "60px",
                        }}
                    >
                        <Row>
                            <div style={{ paddingLeft: "130px", marginTop: "30px" }}>
                                <img
                                    width="40"
                                    height="39"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/dang-ky-1.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </div>
                        </Row>
                        <Row>
                            <h4
                                style={{
                                    fontWeight: "bold",
                                    paddingLeft: "40px",
                                    marginTop: "10px",
                                }}
                            >
                                Đăng ký thông tin
                            </h4>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                Quý khách vui lòng để lại thông tin hoặc liên hệ hotline để được
                                tư vấn hỗ trợ
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={2}
                        style={{
                            backgroundColor: "#FFF",
                            borderRadius: "15px",
                            width: "290px",
                            height: "310px",
                            marginLeft: "40px",
                        }}
                    >
                        <Row>
                            <div style={{ paddingLeft: "130px", marginTop: "30px" }}>
                                <img
                                    width="40"
                                    height="39"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/dang-ky-2.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </div>
                        </Row>
                        <Row>
                            <h4
                                style={{
                                    fontWeight: "bold",
                                    paddingLeft: "107px",
                                    marginTop: "10px",
                                }}
                            >
                                Tư vấn
                            </h4>
                        </Row>
                        <Row>
                            {" "}
                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                Vebibeer sẽ liên hệ xác minh thông tin và tư vấn sớm nhất. Giải
                                đáp tất cả thắc mắc của nhà xe về tệp khách hàng mục tiêu và kỷ
                                vọng của nhà xe.
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={2}
                        style={{
                            backgroundColor: "#FFF",
                            borderRadius: "15px",
                            width: "290px",
                            height: "310px",
                            marginLeft: "40px",
                        }}
                    >
                        <Row>
                            <div style={{ paddingLeft: "130px", marginTop: "30px" }}>
                                <img
                                    width="40"
                                    height="39"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/dang-ky-3.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </div>
                        </Row>
                        <Row>
                            {" "}
                            <h4
                                style={{
                                    fontWeight: "bold",
                                    paddingLeft: "70px",
                                    marginTop: "10px",
                                }}
                            >
                                Ký hợp đồng
                            </h4>
                        </Row>
                        <Row>
                            {" "}
                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                Sau khi tư vấn thành công, Chủ nhà xe và Vebibeer sẽ tiến hành
                                ký kết hợp đồng.
                            </p>
                        </Row>
                    </Col>
                    <Col
                        md={2}
                        style={{
                            backgroundColor: "#FFF",
                            borderRadius: "15px",
                            width: "290px",
                            height: "310px",
                            marginLeft: "40px",
                        }}
                    >
                        <Row>
                            <div style={{ paddingLeft: "130px", marginTop: "30px" }}>
                                <img
                                    width="40"
                                    height="39"
                                    src="https://bms.vexere.com/wp-content/uploads/2023/06/dang-ky-4.png"
                                    class="attachment-large size-large"
                                    alt=""
                                ></img>
                            </div>
                        </Row>
                        <Row>
                            {" "}
                            <h4
                                style={{
                                    fontWeight: "bold",
                                    paddingLeft: "37px",
                                    marginTop: "10px",
                                }}
                            >
                                Mở bán tại Vebibeer
                            </h4>
                        </Row>
                        <Row>
                            {" "}
                            <p style={{ textAlign: "center", marginTop: "10px" }}>
                                Mở bán trên sàn Vebibeer.com, chúng tôi luôn đồng hành và hỗ trợ
                                nhà xe cho đến khi phát sinh doanh thu. Chủ nhà xe hoàn toàn
                                kiểm soát được nội dung hiển thị trên sàn về thương hiệu nhà xe.
                            </p>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ paddingLeft: "550px", paddingTop: "10px" }}>
                    <Button
                        style={{
                            backgroundColor: "#F2C94C",
                            width: "330px",
                            height: "50px",
                            color: "#1A1A1A",
                            border: "none",
                            fontWeight: "bold",
                            fontSize: "18px",
                        }}
                    >
                        Đăng ký mở bán
                    </Button>
                </Row>
            </Row>
            <Row>
                <p
                    style={{
                        paddingTop: "60px",
                        paddingLeft: "300px",
                        fontWeight: "bold",
                        fontSize: "34px",
                    }}
                >
                    Biết thêm thông tin về khách mua vé tại Vebibeer.com
                </p>
            </Row>
            <Row style={{ marginTop: "40px", marginBottom: "50px" }}>
                <Col md={9} style={{}}>
                    <Row>
                        <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "70px",
                            }}
                        >
                            <img
                                width="24"
                                height="24"
                                src="https://bms.vexere.com/wp-content/uploads/2023/06/check_circle.png"
                                className="attachment-large size-large"
                                alt=""
                                style={{ marginRight: "10px" }} // Add some space between the image and text
                            />
                            <div
                                className="ok"
                                style={{ fontSize: "18px", paddingLeft: "6px" }}
                            >
                                <strong>75%</strong> quan tâm uy tín nhà xe thông qua đánh giá
                                của khách hàng
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div
                            style={{
                                marginTop: "22px",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "70px",
                            }}
                        >
                            <img
                                width="24"
                                height="24"
                                src="https://bms.vexere.com/wp-content/uploads/2023/06/check_circle.png"
                                className="attachment-large size-large"
                                alt=""
                            />
                            <div
                                className="ok"
                                style={{ fontSize: "18px", marginLeft: "15px" }}
                            >
                                <strong>57%</strong> chọn mua vé nhà xe có vệ sinh sạch sẽ và
                                phòng dịch Covid-19 an toàn
                            </div>
                        </div>
                    </Row>
                    <Row>
                        {" "}
                        <div
                            style={{
                                marginTop: "22px",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "70px",
                            }}
                        >
                            <img
                                width="24"
                                height="24"
                                src="https://bms.vexere.com/wp-content/uploads/2023/06/check_circle.png"
                                className="attachment-large size-large"
                                alt=""
                                style={{ marginRight: "15 px" }} // Add some space between the image and text
                            />
                            <div
                                className="ok"
                                style={{ fontSize: "18px", marginLeft: "15px" }}
                            >
                                <strong>53%</strong> lựa chọn nhà xe có đa dạng điểm đón/trả,
                                trung chuyển tận nơi và chạy đúng giờ
                            </div>
                        </div>
                    </Row>
                    <Row>
                        {" "}
                        <div
                            style={{
                                marginTop: "22px",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "70px",
                            }}
                        >
                            <img
                                width="24"
                                height="24"
                                src="https://bms.vexere.com/wp-content/uploads/2023/06/check_circle.png"
                                className="attachment-large size-large"
                                alt=""
                            />
                            <div
                                className="ok"
                                style={{ fontSize: "18px", marginLeft: "15px" }}
                            >
                                <strong>41%</strong> gắn bó với một nhà xe do có nhiều chương
                                trình ưu đãi, khuyến mãi hấp dẫn.
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div
                            style={{
                                marginTop: "22px",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "70px",
                            }}
                        >
                            <img
                                width="24"
                                height="24"
                                src="https://bms.vexere.com/wp-content/uploads/2023/06/check_circle.png"
                                className="attachment-large size-large"
                                alt=""
                            />
                            <div
                                className="ok"
                                style={{ fontSize: "18px", marginLeft: "15px" }}
                            >
                                <strong>20%</strong> quan tâm đến loại xe limousine giường phòng
                                để hạn chế tiếp xúc khi di chuyển bằng xe khách
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col md={1} style={{ paddingLeft: "40px" }}>
                    <div>
                        <img
                            width="270"
                            height="270"
                            src="https://bms.vexere.com/wp-content/uploads/2023/06/thong-tin-vexere.png"
                            class="attachment-large size-large"
                            alt=""
                            srcset="https://bms.vexere.com/wp-content/uploads/2023/06/thong-tin-vexere.png 278w, https://bms.vexere.com/wp-content/uploads/2023/06/thong-tin-vexere-150x150.png 150w"
                            sizes="(max-width: 278px) 100vw, 278px"
                        ></img>
                    </div>
                </Col>
            </Row>
            <Row
                style={{
                    backgroundColor: "#F9F9F9",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "2150px",
                    width: "160%",
                    display: "flex",

                    flexWrap: "wrap",
                }}
            >
                <Col>
                    <h3
                        style={{
                            paddingTop: "100px",
                            paddingLeft: "390px",
                            fontWeight: "bold",
                            fontSize: "34px",
                            margin: 0, // Added to remove default margin
                        }}
                    >
                        Lắng nghe khách hàng nói về Vebibeer
                    </h3>
                    <p
                        style={{
                            paddingTop: "30px", // Adjust this value as needed
                            paddingLeft: "390px",
                            fontSize: "18px",
                            margin: 0, // Added to remove default margin
                        }}
                    >
                        Hơn 2000 nhà xe đang mở bán trên sàn Vebibeer - Sàn bán vé số 1 Việt
                        Nam
                    </p>
                </Col>

                <Row
                    style={{
                        backgroundColor: "#FFF",
                        width: "97%",
                        borderRadius: "15px",
                        marginLeft: "25px",
                        height: "560px",
                        marginTop: "37px",
                    }}
                >
                    <Col
                        md={3}
                        style={{
                            paddingTop: "48px",
                            paddingLeft: "160px",
                            marginRight: "180px",
                        }}
                    >
                        <img
                            src="https://htmediagroup.vn/wp-content/uploads/2022/09/Anh-giam-doc-4.jpg"
                            alt="Ảnh giám đốc"
                            style={{ Width: "300px", height: "400px", borderRadius: "5%" }}
                        />
                        <Col
                            style={{
                                paddingTop: "20px",
                                width: "300px",
                                paddingLeft: "10px",
                                textAlign: "center",
                                paddingRight: "50px",
                            }}
                        >
                            <h5 style={{ fontSize: "18px" }}>
                                Anh <strong>Phan Văn Luyến</strong>
                            </h5>
                            <p>Nhà xe Hạnh Luyến</p>
                        </Col>
                    </Col>
                    <Col
                        md={7}
                        style={{
                            fontStyle: " italic",
                            fontSize: "18px",
                            paddingTop: "48px",
                            textAlign: "justify",
                            paddingRight: "40px",
                        }}
                    >
                        <p>
                            "Vebibeer đã là đối tác vô cùng quý giá trong hành trình thành
                            công của chúng tôi. Doanh thu và quy mô của chúng tôi đã tăng đáng
                            kể từ 2 lên 20 xe kể từ khi bán vé trên nền tảng của Vebibeer. Với
                            sự hỗ trợ và hướng dẫn từ Vebibeer, chúng tôi đã và đang là top
                            nhà xe được khách hàng yêu thích tại tuyến Đà Nẵng - Quảng Bình.
                            <br></br>
                            Điểm đặc biệt của Vebibeer là đội ngũ rất chuyên nghiệp. Họ đã
                            luôn đồng hành cùng chúng tôi, phân tích chiến lược các tuyến
                            đường và xác định những điểm cần cải thiện trong hoạt động của
                            chúng tôi. Việc có một đại diện của Vebibeer ngồi cùng chúng tôi,
                            cung cấp thông tin và hướng dẫn đã đóng vai trò quan trọng trong
                            thành công của chúng tôi. Họ thấu hiểu sự quan trọng của việc cộng
                            tác chặt chẽ để giúp chúng tôi đạt được mục tiêu. Chúng tôi đã tối
                            ưu hóa hoạt động, nâng cao chất lượng dịch vụ và thu hút nhiều
                            khách hàng hơn. Sự chuyên môn và hỗ trợ của họ đã tạo ra giá trị
                            không thể đo đạc trong việc thúc đẩy kinh doanh của chúng tôi.
                            <br></br>
                            Chúng tôi rất biết ơn sự cam kết và tận tụy của họ đối với thành
                            công của chúng tôi. Chúng tôi giới thiệu Vebibeer cho bất kỳ công
                            ty vận chuyển nào muốn phát triển kinh doanh và đạt được kết quả
                            xuất sắc. Họ không chỉ đơn thuần là một nền tảng, mà còn là một
                            đối tác chiến lược quan tâm đến thành công của chúng tôi."
                        </p>
                    </Col>
                </Row>

                <Row
                    style={{
                        backgroundColor: "#FFF",
                        width: "97%",
                        borderRadius: "15px",
                        marginLeft: "25px",
                        height: "560px",
                        marginTop: "37px",
                    }}
                >
                    <Col
                        md={8}
                        style={{
                            fontStyle: " italic",
                            fontSize: "18px",
                            paddingTop: "48px",
                            textAlign: "justify",

                            paddingLeft: "160px",
                        }}
                    >
                        <p>
                            "Với sự hỗ trợ toàn diện từ Vebibeer, nhà xe của chúng tôi đã có
                            thể tăng doanh thu bán vé thông qua sàn giao dịch. Vebibeer cung
                            cấp một loạt công cụ giúp tăng lượng truy cập vào gian hàng của
                            chúng tôi trên nền tảng, đồng thời hỗ trợ tăng số lượng khách hàng
                            mua vé thông qua các chương trình ưu đãi hấp dẫn như ưu đãi đặt
                            sớm và ưu đãi phút chót. Nhờ đó, chúng tôi đã có cơ hội mở rộng
                            quy mô kinh doanh và đạt được kết quả đáng kinh ngạc.
                            <br></br>
                            Bên cạnh đó, chúng tôi rất hài lòng với các chương trình độc quyền
                            từ Vebibeer. Nhà xe của chúng tôi đã được tận hưởng bộ quyền lợi
                            truyền thông trị giá lên đến 50 triệu đồng, được ưu tiên hiển thị
                            trên các trang bán vé của Vebibeervà được hưởng ưu đãi đặc biệt
                            trong hệ sinh thái Vebibeer. Những quyền lợi này đã giúp chúng tôi
                            nổi bật và thu hút sự chú ý từ khách hàng.
                            <br></br>
                            Việc đăng ký mở bán vé trên Vebibeer cực kỳ đơn giản. Chỉ cần hoàn
                            tất quy trình đăng ký, chúng tôi đã có thể tận hưởng những lợi ích
                            vô cùng đáng giá mà Vebibeer mang lại. Chúng tôi thật sự biết ơn
                            Vebibeer vì sự hỗ trợ và cơ hội phát triển kinh doanh tuyệt vời
                            này!"
                        </p>
                    </Col>
                    <Col
                        md={3}
                        style={{
                            paddingTop: "48px",
                            paddingLeft: "100px",
                            marginRight: "80px",
                        }}
                    >
                        <img
                            src="https://htmediagroup.vn/wp-content/uploads/2021/06/Anh-profile-48-585x878.jpg"
                            alt="Ảnh giám đốc"
                            style={{ maxWidth: "340px", height: "400px", borderRadius: "5%" }}
                        />
                        <Col
                            style={{
                                paddingTop: "20px",
                                width: "300px",
                                paddingLeft: "10px",
                                textAlign: "center",
                                paddingRight: "50px",
                            }}
                        >
                            <h5 style={{ fontSize: "18px" }}>
                                Anh <strong>Nguyễn Hữu Luân</strong>
                            </h5>
                            <p>Nhà xe Phương Trang</p>
                        </Col>
                    </Col>
                </Row>

                <Row
                    style={{
                        backgroundColor: "#FFF",
                        width: "97%",
                        borderRadius: "15px",
                        marginLeft: "25px",
                        height: "560px",
                        marginTop: "37px",
                    }}
                >
                    <Col
                        md={3}
                        style={{
                            paddingTop: "48px",
                            paddingLeft: "160px",
                            marginRight: "180px",
                        }}
                    >
                        <img
                            src="https://htmediagroup.vn/wp-content/uploads/2021/06/Anh-profile-56-585x878.jpg"
                            alt="Ảnh giám đốc"
                            style={{ Width: "300px", height: "400px", borderRadius: "5%" }}
                        />
                        <Col
                            style={{
                                paddingTop: "20px",
                                width: "300px",
                                paddingLeft: "10px",
                                textAlign: "center",
                                paddingRight: "50px",
                            }}
                        >
                            <h5 style={{ fontSize: "18px" }}>
                                Anh <strong>Phạm Nhật Trung</strong>
                            </h5>
                            <p>Nhà xe Trung Tín</p>
                        </Col>
                    </Col>
                    <Col
                        md={7}
                        style={{
                            fontStyle: " italic",
                            fontSize: "18px",
                            paddingTop: "48px",
                            textAlign: "justify",
                            paddingRight: "40px",
                        }}
                    >
                        <p>
                            "Với sự hỗ trợ từ Vebibeer, nhà xe của tôi đã nhận được đánh giá
                            cao từ khách hàng trên sàn với điểm đánh giá trung bình từ 4.5 đến
                            4.6 sao. Vebibeer áp dụng một thuật toán sắp xếp thứ tự hiển thị
                            các nhà xe dựa trên các tiêu chí nhất định, bao gồm chất lượng
                            phục vụ của nhà xe, chính sách hủy vé, hình ảnh và khả năng cho
                            phép khách hàng thanh toán tại nhà xe. Điều này được thực hiện mà
                            không có sự can thiệp của con người. Vebibeer ưu tiên giới thiệu
                            các nhà xe có chất lượng phục vụ tốt cho khách hàng.
                            <br></br>
                            Tôi rất biết ơn Vebibeer vì việc tạo ra một môi trường công bằng
                            và chất lượng cho nhà xe của tôi. Nhờ vào sự ưu tiên và giới thiệu
                            từ Vebibeer, chúng tôi đã nhận được sự tín nhiệm và sự tin tưởng
                            từ khách hàng. Điều này đã giúp chúng tôi không chỉ tăng doanh thu
                            trực tuyến mà còn tạo ra sự tăng trưởng về doanh thu offline và
                            xây dựng một thương hiệu nhà xe mạnh mẽ trong lòng khách hàng"
                        </p>
                    </Col>
                </Row>
            </Row>
            <Row>
                <h3
                    style={{
                        paddingTop: "70px",
                        paddingLeft: "500px",
                        fontWeight: "bold",
                        fontSize: "34px",
                        margin: 0, // Added to remove default margin
                    }}
                >
                    Giải đáp thắc mắc của bạn
                </h3>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "80px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="1. Lợi ích của việc trở thành đối tác bán vé trên sàn của Vebibeer là gì?"
                        answer="Sau khi đăng ký mở bán vé trên sàn thành công, Vebibeer sẽ liên tục cập nhật cho nhà xe về xu hướng nhu cầu/hành vi của người dùng (hành khách) thông qua bộ công cụ mở bán linh hoạt và bảng tổng hợp các số liệu báo cáo chuyên sâu nhằm giúp nhà xe có góc nhìn tổng thể, thấu hiểu sâu sắc về thị trường và ra được các chiến lược kinh doanh phù hợp. Đối tác của Vebibeer sẽ luôn được đối soát, thanh toán đúng hẹn, minh bạch, có quy trình chặt chẽ. Mỗi đối tác Vebibeer đều nhận được sự hỗ trợ nhanh từ đội ngũ chuyên viên. Các hãng xe có thể tận dụng các lợi thế của Vebibeer như: hơn 3 triệu lượt truy cập web/app Vebibeer mỗi năm, hơn 5000 đại lý bán vé trong và ngoài nước, các chương trình ưu đãi của Vebibeer để nhanh chóng tăng tỷ lệ lấp đầy và tăng 30% doanh thu."
                    />
                </Col>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "10px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="2. Quy trình đăng ký xe mở bán vé trên Vebibeer như thế nào?"
                        answer={`1. Đăng ký thông tin: Quý khách vui lòng để lại thông tin hoặc liên hệ hotline để được tư vấn hỗ trợ\n\n2. Tư vấn: Vebibeer sẽ liên hệ xác minh thông tin và tư vấn sớm nhất. Giải đáp tất cả thắc mắc của nhà xe về tệp khách hàng mục tiêu và kỷ vọng của nhà xe\n\n3. Ký hợp đồng: Sau khi tư vấn thành công, Chủ nhà xe và Vebibeer sẽ tiến hành ký kết hợp đồng.\n\n4. Mở bán tại Vebibeer: Mở bán trên sàn Vebibeer.com, chúng tôi luôn đồng hành và hỗ trợ nhà xe cho đến khi phát sinh doanh thu. Nhà xe hoàn toàn có thể kiểm soát được hình ảnh thương hiệu và nội dung hiển thị trên sàn.`}
                    />
                </Col>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "10px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="3. Vebibeer thu những khoản phí nào?"
                        answer="Vebibeer không thu phí mở bán vé trên sàn. Chúng tôi chỉ thu phí từ khi nhà xe phát sinh giao dịch bán vé thành công với mức hoa hồng cố định đã được thống nhất khi ký hợp đồng."
                    />
                </Col>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "10px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="4. Làm thế nào để tôi quản lý kho vé trên Vebibeer"
                        answer={`Hệ thống đảm bảo viêc gửi thông báo tức thời khi có khách mua vé, giúp nhà xe có thể bấm xem và xác nhận vé đã đặt thành công tại 2 nền tảng: web và app.\n\nNgoài ra, để tối ưu thêm 20% chi phí quản lý, nhà xe cũng có thể sử dụng trọn bộ phần mềm quản lý vé xe khách để không chỉ bán vé trực tuyến tăng doanh thu hơn mà còn chuyển đổi số toàn nhà xe trở nên hiện đại hoá hơn.`}
                    />
                </Col>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "10px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="5. Làm thế nào để tôi biết nếu một chỗ ngồi đã được đặt?"
                        answer={`Vebibeer cung cấp cho nhà xe công cụ giúp mở bán và quản lý vé đã đặt thành công. Sau khi đăng ký mở bán, nhà xe chỉ cần đăng nhập và sử dụng theo đúng hướng dẫn của chuyên viên là sẽ có thể nhận được thông báo tức thời trên hệ thống khi có khách đặt vé và xem được số lượng/vị trí các vé đã đặt một cách dễ dàng.\n\nVới nhà xe có quan tâm đến việc dùng phần mềm quản lý bán vé để vừa quản lý nhà xe vừa bán vé trực tuyến, đội ngũ nhà xe có thể nhận biết được vé đã đặt đơn giản qua màu sắc của vé trên sơ đồ xe (khác biệt so với các vé khác của nhà xe), có nguồn vé rõ ràng, có lịch sử cụ thể và loại báo cáo đặc thù để biết được thông tin vé thanh toán trực tuyến.`}
                    />
                </Col>
            </Row>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid black",
                    width: "96%",
                    marginTop: "10px", // Adjust the margin as needed
                    marginLeft: "30px",
                }}
            />
            <Row>
                <Col style={{ marginLeft: "30px" }}>
                    <FAQItem
                        question="6. Làm thế nào để tôi nhận được thanh toán khi bán vé trên sàn Vebibeer"
                        answer="Vebibeer cam kết với việc thanh toán đúng hẹn đối với các đối tác nhà xe của mình. Vebibeer thực hiện thanh toán qua chuyển khoản trực tuyến vào tài khoản ngân hàng của đối tác vào mỗi tháng theo đúng thoả thuận đã ký trên hợp đồng."
                    />
                </Col>
            </Row>

            <Row
                style={{ backgroundColor: "#1E2F97", width: "110%", height: "450px" }}
            >
                <Row style={{ paddingTop: " 60px", paddingLeft: "450px" }}>
                    <p style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>
                        Tin tức về Vebibeer.com
                    </p>
                </Row>
                <Row style={{ paddingLeft: "30px" }}>
                    <Col>
                        <h2
                            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
                        >
                            Tính năng Nghiệm thu doanh thu, chi phí – Phần mềm quản lý bán vé
                            Vebibeer
                        </h2>
                    </Col>
                    <Col style={{ paddingLeft: "20px" }}>
                        {" "}
                        <h2
                            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
                        >
                            HÀ LAN KHAI TRƯƠNG TUYẾN XE CHẤT LƯỢNG CAO
                        </h2>
                    </Col>
                    <Col>
                        {" "}
                        <h2
                            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
                        >
                            Nhà xe Thanh Thuỷ – Mạnh mẽ đổi mới, vươn tới thành công
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {" "}
                        <h2 style={{ color: "white", fontSize: "17px" }}>
                            Giới thiệu tính năng “Nghiệm thu doanh thu, chi phí” của phần mềm
                            quản lý bán vé Vebibeer Trong suốt hơn 1 năm tư vấn
                        </h2>
                    </Col>
                    <Col>
                        {" "}
                        <h2 style={{ color: "white", fontSize: "17px" }}>
                            Sau thời gian dài chuẩn bị kỹ lưỡng – HaLan Buslines đã chính thức
                            “lăn bánh” – phục vụ khách hàng trên cung đường Thái
                        </h2>
                    </Col>
                    <Col>
                        {" "}
                        <h2 style={{ color: "white", fontSize: "17px" }}>
                            Thành lập vào năm 2001 với 10 chiếc xe 16 chỗ và vỏn vẹn 20 nhân
                            viên. Đến nay nhà xe Thanh Thuỷ đã tăng
                        </h2>
                    </Col>
                </Row>
            </Row>
            <Row
                style={{
                    backgroundColor: "#545454",
                    width: "110%",
                    height: "70px",
                    fontWeight: "bold",
                    fontSize: "23px",
                    color: "#ADADAD",
                    paddingLeft: "1050px",
                    paddingTop: " 20px",
                }}
            >
                <p> Copyright 2024 © Vebibeer</p>
            </Row>
        </Container>
    );
};

export default AboutUss;
