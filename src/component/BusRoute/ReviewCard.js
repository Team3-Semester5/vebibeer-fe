import React, { useState } from 'react';
import './ReviewCard.css';
import { useAuth } from './AuthContext';

const ReviewCard = ({ review, onDelete, onEdit }) => {
    const { user } = useAuth();

    const isValidDate = (dateString) => {
        return dateString !== null && dateString !== undefined;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formattedDate = isValidDate(review.rating_editTime) ? formatDate(review.rating_editTime) : 'Invalid Date';

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(review.rating_content);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(review.rating_id, editedContent);
        setIsEditing(false);
    };
    console.log(review)

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="user-info">
                    <img src={review.customer && review.customer.customer_img_ava ? review.customer.customer_img_ava : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg"} alt="User Avatar" className="user-initials" />
                    <span className="user-name">{review.customer ? review.customer.username : 'Unknown User'}</span>
                </div>
                <div className="review-rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={`star ${index < review.amount_star ? 'filled' : ''}`}>&#9733;</span>
                    ))}
                </div>
            </div>
            <div className="review-content">
                {isEditing ? (
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                ) : (
                    <p>{review.rating_content}</p>
                )}
            </div>
            <div className="review-footer">
                <span className="review-date">{formattedDate}</span>
                <br></br>
                {review.customer.verify_purchased}
                {review.customer && review.customer.verify_purchased && <span className="review-verified">Verified</span>}
                {user && user.username === review.customer.username && (
                    <div className="review-actions">
                        <button className="delete" onClick={() => onDelete(review.rating_id)}>Delete</button>
                        {!isEditing && <button className="edit" onClick={handleEditClick}>Edit</button>}
                        {isEditing && <button className="edit" onClick={handleSaveClick}>Save</button>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;
