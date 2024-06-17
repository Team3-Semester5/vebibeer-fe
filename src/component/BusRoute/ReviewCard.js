import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <div className="user-info">
                    <img src={review.customer.customer_img_ava} alt="User Avatar" className="user-initials" />
                    <span className="user-name">{review.customer.username}</span>
                </div>
                <div className="review-rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={`star ${index < review.amount_star ? 'filled' : ''}`}>&#9733;</span>
                    ))}
                </div>
            </div>
            <div className="review-content">
                <p>{review.rating_content}</p>
            </div>
            <div className="review-footer">
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                {review.customer.verify_purchased && <span className="review-verified">Verified</span>}
            </div>
        </div>
    );
};

export default ReviewCard;
