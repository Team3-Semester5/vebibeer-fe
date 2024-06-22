import React, { useState, useEffect } from 'react';
import './RouteItem.css';
import PromoCard from './PromoCard';
import BusCarousel from './BusCarousel';
import ReviewCard from './ReviewCard';
import SeatMap from './SeatMap';
import NewReviewCard from './NewReviewCard';
import { useAuth } from './AuthContext';

const RouteItem = ({ route }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('discount');

    const toggleCollapse = () => setIsOpen(!isOpen);

    const isValidDate = (dateString) => dateString !== null && dateString !== undefined;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const start_time = isValidDate(route.route_startTime) ? formatDate(route.route_startTime) : 'Invalid Date';
    const end_time = isValidDate(route.route_endTime) ? formatDate(route.route_endTime) : 'Invalid Date';

    const handleBookNowClick = () => {
        toggleCollapse();
        if (activeTab !== 'seat') {
            setActiveTab('seat');
            return;
        }
        setActiveTab('discount');
    };

    // Hàm fetch dữ liệu đánh giá
    const fetchRatingList = async () => {
        const id = route.busCompany.busCompany_id;
        try {
            const response = await fetch('http://localhost:8080/rating/' + id);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Sắp xếp các đánh giá theo thứ tự thời gian gần nhất
            const sortedRatings = data.sort((a, b) => new Date(b.rating_editTime) - new Date(a.rating_editTime));
            setRatings(sortedRatings);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching ratings:', error);
        }
    };

    const handleNewReview = (newReview) => {
        // Sau khi submit đánh giá mới thành công, gọi lại fetchRatingList để lấy dữ liệu mới nhất từ server
        fetchRatingList();
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:8080/rating/delete/${reviewId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                fetchRatingList(); // Refresh the ratings list after successful delete
            } else {
                console.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Network or server error:', error);
        }
    };

    const handleEditReview = async (reviewId, newContent) => {
        try {
            const response = await fetch(`http://localhost:8080/rating/update/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating_content: newContent }),
                credentials: 'include'
            });
            if (response.ok) {
                fetchRatingList(); // Refresh the ratings list after successful edit
            } else {
                console.error('Failed to edit review');
            }
        } catch (error) {
            console.error('Network or server error:', error);
        }
    };

    useEffect(() => {
        const fetchVoucherList = async () => {
            try {
                const response = await fetch('http://localhost:8080/voucher');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setVouchers(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching vouchers:', error);
            }
        };

        // Gọi fetchRatingList khi activeTab là 'rating'
        if (activeTab === 'rating') {
            fetchRatingList();
        }

        if (activeTab === 'discount') {
            fetchVoucherList();
        }
    }, [activeTab]);

    const renderContent = (props) => {
        switch (activeTab) {
            case 'discount':
                return (
                    <div className='container'>
                        {vouchers.map(voucher => (
                            <PromoCard key={voucher.voucher_code} voucher={voucher} />
                        ))}
                    </div>
                );
            case 'images':
                return (
                    <div>
                        <BusCarousel route={props} />
                    </div>
                );
            case 'services':
                if (!props || props.length === 0) {
                    return <p>No services available.</p>;
                }
                return (
                    <div className='container'>
                        {props.services.map(prop => (
                            <div key={prop.service_id} className='row'>
                                <div className='col-md-2'>
                                    <img src={prop.service_logoUrl} style={{ width: '80%', height: '100%', padding: '10px' }} />
                                </div>
                                <div className='col-md-10' style={{ padding: '10px' }}>
                                    <h4>{prop.service_name}</h4>
                                    <p>{prop.service_description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'pickup':
                return (
                    <div className="schedule-container">
                        <div className="notes">
                            <strong>Lưu ý</strong>
                            <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.</p>
                            <p>Lịch này có thể thay đổi tùy tình hình thực tế.</p>
                        </div>
                        <div className="schedule">
                            <div className="pickup">
                                <h3>Điểm đón</h3>
                                <ul>
                                    <li><span>18:46</span> • Cổng trung chuyển Nội thành Thành phố Đà Nẵng</li>
                                    <li><span>20:16</span> • VP Đà Nẵng</li>
                                </ul>
                            </div>
                            <div className="dropoff">
                                <h3>Điểm trả</h3>
                                <ul>
                                    <li><span>07:16</span> • Bến xe Nước Ngầm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'direction':
                return (
                    <div className="container mt-4">
                        <div className="policy-container">
                            <h1>Chính sách hủy đơn hàng</h1>
                            <div className="timeline-container">
                                <div className="timeline">
                                    <div className="point point-start">
                                        <span className="time">Hôm nay<br />20:16<br />15/06/2024</span>
                                        <div className="fee">Phí hủy 20%</div>
                                    </div>
                                    <div className="point point-end">
                                        <span className="time">08:16<br />16/06/2024</span>
                                        <div className="fee">Phí hủy 100%</div>
                                    </div>
                                </div>
                            </div>
                            <p className="note">Ghi Chú: Phí hủy sẽ được tính trên giá gốc, không giảm trừ khuyến mãi hoặc giảm giá; đồng thời không vượt quá số tiền quý khách đã thanh toán. Nhà xe không chấp nhận vận chuyển mèo dưới mọi hình thức.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Chính sách nhà xe</h2>
                            <ul>
                                <li>Cấm kị tất cả loại vật liệu dễ cháy như xăng, dầu.</li>
                                <li>Khoảng cách an toàn, thời gian di chuyển.</li>
                                {/* Add more items as needed */}
                            </ul>
                        </div>
                        <div className="mb-3">
                            <h2>Hành lý xách tay</h2>
                            <p>Không trọng lượng hạn hẹp không vượt quá 7 kg.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Điều kiện vận chuyển đặc biệt</h2>
                            <p>Đối với hàng hóa đặc biệt, cần có giấy phép vận chuyển riêng.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Quy định về đổi trả</h2>
                            <p>Khách hàng có thể đổi trả hàng trong vòng 24 giờ nếu sản phẩm còn nguyên đai, nguyên kiện.</p>
                        </div>
                    </div>
                );
            case 'rating':
                return (
                    <div>
                        {ratings.map(review => (
                            <ReviewCard key={review.rating_id} review={review} onDelete={handleDeleteReview} onEdit={handleEditReview} />
                        ))}
                        {user && (
                            <NewReviewCard
                                onSubmitReview={handleNewReview}
                                busCompany_id={route.busCompany.busCompany_id}
                            />
                        )}
                    </div>
                );
            case 'seat':
                return (
                    <div>
                        <SeatMap route={props} />
                    </div>
                );
            default:
                return <p>Hello</p>;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '10px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <img src={route.car.car_imgUrl1} alt="Bus" style={{ width: '100px', height: '60px', marginRight: '10px' }} />
                    <div>
                        <h4>{route.busCompany.busCompany_name} <span style={{ fontSize: '0.8rem', color: '#666' }}>{route.rating}</span></h4>
                        <p>{route.route_description}</p>
                        <p><b>{start_time}</b> • {route.startLocation.location_name}</p>
                        <p>|</p>
                        <p><b>{end_time}</b> • {route.endLocation.location_name}</p>
                        {activeTab !== 'seat' && (
                            <button
                                onClick={toggleCollapse}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '5px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isOpen ? 'Hide Details' : 'Show Details'}
                            </button>
                        )}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h3>400$</h3>
                    <p>{route.car.amount_seat} seats left</p>
                    <button onClick={handleBookNowClick} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Book now
                    </button>
                </div>
            </div>
            {isOpen && (
                <div style={{ marginTop: '10px' }}>
                    <div className="container">
                        {activeTab !== 'seat' && (
                            <div className="tabs">
                                <button className={`tab ${activeTab === 'discount' ? 'active' : ''}`} onClick={() => setActiveTab('discount')}>Giảm giá</button>
                                <button className={`tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Hình ảnh</button>
                                <button className={`tab ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Tiện ích</button>
                                <button className={`tab ${activeTab === 'pickup' ? 'active' : ''}`} onClick={() => setActiveTab('pickup')}>Điểm đón, trả</button>
                                <button className={`tab ${activeTab === 'direction' ? 'active' : ''}`} onClick={() => setActiveTab('direction')}>Chỉ dẫn</button>
                                <button className={`tab ${activeTab === 'rating' ? 'active' : ''}`} onClick={() => setActiveTab('rating')}>Đánh giá</button>
                            </div>
                        )}
                        <div className="content">
                            {renderContent(route)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RouteItem;
