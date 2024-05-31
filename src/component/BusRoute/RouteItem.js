import React, { useState } from 'react';
import './RouteItem.css';

const RouteItem = ({ route }) => {
    // State to manage the visibility of the collapsible content
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen(!isOpen);
    const [activeTab, setActiveTab] = useState('discount');

    const renderContent = (props) => {
        switch (activeTab) {
            case 'discount':
                return <p>Hello</p>;
            case 'images':
                return <p>Images content here</p>;
            case 'services':
                console.log(props.length)
                return (
                    <div>
                        {props?.map(prop => {
                            <div key={prop.service_id}>
                                <p>{prop.service_name}</p>
                            </div>
                            
                        })}
                    </div>


                );
            case 'pickup':
                return <p>Pick-up and drop-off points here</p>;
            case 'direction':
                return <p>Direction content here</p>;
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
                        <p><b>{route.route_startTime}</b> • {route.startLocation.location_name}</p>
                        <p>|</p>
                        <p><b>{route.route_endTime}</b> • {route.endLocation.location_name}</p>
                        <button onClick={toggleCollapse} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            {isOpen ? 'Hide Details' : 'Show Details'}
                        </button>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h3>400$</h3>
                    <p>{route.car.amount_seat} seats left</p>
                    <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Book Now</button>
                </div>
            </div>
            {isOpen && (
                <div style={{ marginTop: '10px' }}>
                    <div className="container">
                        <div className="tabs">
                            <button className={`tab ${activeTab === 'discount' ? 'active' : ''}`} onClick={() => setActiveTab('discount')}>Giảm giá</button>
                            <button className={`tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Hình ảnh</button>
                            <button className={`tab ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Tiện ích</button>
                            <button className={`tab ${activeTab === 'pickup' ? 'active' : ''}`} onClick={() => setActiveTab('pickup')}>Điểm đón, trả</button>
                            <button className={`tab ${activeTab === 'direction' ? 'active' : ''}`} onClick={() => setActiveTab('direction')}>Chỉ</button>
                        </div>
                        <div className="content">
                            {renderContent(route.services)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RouteItem;