import React from 'react';
import './ReviewCard.css';  // Assume styles are defined here

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header container">
        <div className="review-user row">
          {/* <div className="user-initials">
            {review.userInitials}
          </div> */}
          <div className='user-initials col-md-4'>
            <img src={review.customer.customer_img_ava} alt='Hello' width='100%' height='100%' />
          </div>
          <div className="user-name col-md-8">{review.customer.username}</div>
        </div>
        <div className="review-rating">{review.amount_star} ★</div>
      </div>
      <div className="review-content">{review.rating_content}</div>
      <div className="review-footer">
        <span className="review-date">{review.rating_editTime}</span>
        {review.customer.verify_purchased && <span className="review-verified">✔ Đã mua vé</span>}
      </div>
    </div>
  );
};

export default ReviewCard;