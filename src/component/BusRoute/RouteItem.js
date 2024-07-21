import React, { useState, useEffect } from 'react';
import './RouteItem.css';
import PromoCard from './PromoCard';
import BusCarousel from './BusCarousel';
import ReviewCard from './ReviewCard';
import NewReviewCard from './NewReviewCard';
import SeatMap from './SeatMap';
import { API_URL } from '../../constaint/fetchApi';
import { Modal, Button } from 'react-bootstrap';

const RouteItem = ({ route }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [highestPrice, setHighestPrice] = useState(null);
    const [activeTab, setActiveTab] = useState('discount');
    const [showModal, setShowModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const toggleCollapse = () => setIsOpen(!isOpen);

    const handleBookNowClick = () => {
        toggleCollapse();
        if (activeTab !== 'seat') {
            setActiveTab('seat');
            return;
        }
        setActiveTab('discount');
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    const fetchRatingList = async () => {
        const id = route.busCompany.busCompany_id;
        try {
            const response = await fetch(`${API_URL}/rating/` + id);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Sort the ratings by the most recent
            const sortedRatings = data.sort((a, b) => new Date(b.rating_editTime) - new Date(a.rating_editTime));
            setRatings(sortedRatings);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching ratings:', error);
        }
    };

    const handleNewReview = () => {
        fetchRatingList();
    };

    const handleDeleteReview = async () => {
        try {
            const response = await fetch(`${API_URL}/rating/update/${selectedReviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating_content: 'Ban', amount_star: 0 }),
                credentials: 'include'
            });
            if (response.ok) {
                fetchRatingList(); // Refresh the ratings list after successful update
                setShowModal(false); // Close the modal after successful deletion
            } else {
                console.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Network or server error:', error);
        }
    };

    const handleEditReview = async (reviewId, newContent, newStar) => {
        try {
            const response = await fetch(`${API_URL}/rating/update/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating_content: newContent, amount_star: newStar }),
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

    const confirmDeleteReview = (reviewId) => {
        setSelectedReviewId(reviewId);
        setShowModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [voucherResponse, lowestResponse, highestResponse] = await Promise.all([
                    fetch(`${API_URL}/buscompany/voucher`),
                    fetch(`${API_URL}/tickets/lowest-price/${route.route_id}/`),
                    fetch(`${API_URL}/tickets/highest-price/${route.route_id}/`)
                ]);

                if (!voucherResponse.ok) throw new Error(`HTTP error! status: ${voucherResponse.status}`);
                if (!lowestResponse.ok) throw new Error(`HTTP error! status: ${lowestResponse.status}`);
                if (!highestResponse.ok) throw new Error(`HTTP error! status: ${highestResponse.status}`);

                const [voucherData, lowestPrice, highestPrice] = await Promise.all([
                    voucherResponse.json(),
                    lowestResponse.json(),
                    highestResponse.json()
                ]);

                console.log('Vouchers:', voucherData);
                console.log('Lowest Price:', lowestPrice);
                console.log('Highest Price:', highestPrice);
                fetchRatingList();
                setVouchers(voucherData);

                setLowestPrice(lowestPrice);
                setHighestPrice(highestPrice);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [route.busCompany.busCompany_id]);

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
                                    <img src={prop.service_logoUrl} style={{ width: '80%', height: '100%', padding: '10px' }} alt='avatar error' />
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
                            <strong>Note</strong>
                            <p>The pickup and drop-off times below are estimated.</p>
                            <p>This schedule may change depending on the actual situation.</p>
                        </div>
                        <div className="schedule">
                            <div className="pickup">
                                <h3>Pickup Points</h3>
                                <ul>
                                    <li><span>18:46</span> • Inner City Transfer Gate, Da Nang City</li>
                                    <li><span>20:16</span> • Da Nang Office</li>
                                </ul>
                            </div>
                            <div className="dropoff">
                                <h3>Drop-off Points</h3>
                                <ul>
                                    <li><span>07:16</span> • Nuoc Ngam Bus Station</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'direction':
                return (
                    <div className="container mt-4">
                        <div className="policy-container">
                            <h1>Order Cancellation Policy</h1>
                            <div className="timeline-container">
                                <div className="timeline">
                                    <div className="point point-start">
                                        <span className="time">Today<br />20:16<br />June 15, 2024</span>
                                        <div className="fee">20% cancellation fee</div>
                                    </div>
                                    <div className="point point-end">
                                        <span className="time">08:16<br />June 16, 2024</span>
                                        <div className="fee">100% cancellation fee</div>
                                    </div>
                                </div>
                            </div>
                            <p className="note">Note: The cancellation fee will be calculated on the original price, without deducting promotions or discounts; and will not exceed the amount you paid. The bus company does not accept cats under any circumstances.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Bus Company Policy</h2>
                            <ul>
                                <li>Prohibition of all flammable materials such as gasoline, oil.</li>
                                <li>Safety distance, travel time.</li>
                            </ul>
                        </div>
                        <div className="mb-3">
                            <h2>Hand Luggage</h2>
                            <p>Hand luggage should not exceed 7 kg.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Special Transportation Conditions</h2>
                            <p>For special goods, separate transport permits are required.</p>
                        </div>
                        <div className="mb-3">
                            <h2>Return Policy</h2>
                            <p>Customers can return goods within 24 hours if the product is still in its original packaging.</p>
                        </div>
                    </div>
                );
            case 'rating':
                return (
                    <div>
                        {ratings.map(review => (
                            !review.rating_content.toLowerCase().startsWith('ban') && (
                                <ReviewCard key={review.rating_id} review={review} onDelete={() => confirmDeleteReview(review.rating_id)} onEdit={handleEditReview} />
                            )
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
                        <p><b>{formatDateTime(route.route_startTime)}</b> • {route.startLocation.location_name}</p>
                        <p>|</p>
                        <p><b>{formatDateTime(route.route_endTime)}</b> • {route.endLocation.location_name}</p>
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
                    <div className="route-summary" onClick={toggleCollapse}>
                        <h3>{route.route_name}</h3>
                        <p>{route.busCompany.name}</p>
                        <p>Price: {lowestPrice}.000 - {highestPrice}.000 VND</p>
                    </div>
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
                                <button className={`tab ${activeTab === 'discount' ? 'active' : ''}`} onClick={() => setActiveTab('discount')}>Discount</button>
                                <button className={`tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Images</button>
                                <button className={`tab ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
                                <button className={`tab ${activeTab === 'pickup' ? 'active' : ''}`} onClick={() => setActiveTab('pickup')}>Pickup & Drop-off Points</button>
                                <button className={`tab ${activeTab === 'direction' ? 'active' : ''}`} onClick={() => setActiveTab('direction')}>Direction</button>
                                <button className={`tab ${activeTab === 'rating' ? 'active' : ''}`} onClick={() => setActiveTab('rating')}>Rating</button>
                            </div>
                        )}
                        <div style={{ width: '100%' }}>
                            {renderContent(route)}
                        </div>
                    </div>
                </div>
            )}
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDeleteReview}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RouteItem;
