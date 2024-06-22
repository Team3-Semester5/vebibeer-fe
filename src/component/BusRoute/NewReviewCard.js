import React, { useState } from 'react';
import './NewReviewCard.css';
import { useAuth } from './AuthContext';

const NewReviewCard = ({ onSubmitReview, busCompany_id }) => {
    const [review, setReview] = useState({
        ratingContent: '',
        amountStar: 0,
    });
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const handleContentChange = (e) => {
        setReview({
            ...review,
            ratingContent: e.target.value,
        });
    };

    const handleStarClick = (index) => {
        setReview({
            ...review,
            amountStar: index + 1,
        });
    };

    const handleSubmit = async () => {
        if (!user) {
            alert('Bạn phải đăng nhập để gửi đánh giá');
            return;
        }

        const newReview = {
            amount_star: review.amountStar,
            rating_content: review.ratingContent,
            rating_editTime: new Date().getTime(), // Timestamp in milliseconds
            customer: {
                customer_id: user.customer_id
            },
            busCompany: {
                busCompany_id: busCompany_id
            }
        };

        console.log('Submitting review:', newReview);

        try {
            const response = await fetch('http://localhost:8080/rating/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
                credentials: 'include'
            });

            const contentType = response.headers.get('Content-Type');
            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await response.json();
                    console.log('Saved review:', responseData);
                    onSubmitReview({
                        ...responseData,
                        customer: {
                            username: user.username,
                            customer_img_ava: user.customer_img_ava,
                            verify_purchased: true, // hoặc giá trị thích hợp nếu có
                        },
                    });
                    setReview({ ratingContent: '', amountStar: 0 }); // Reset fields after successful submit
                    setError(null);
                } else {
                    const textData = await response.text();
                    console.log('Server returned non-JSON response:', textData);
                    if (textData === 'Rating saved successfully') {
                        onSubmitReview({
                            ...newReview,
                            rating_content: newReview.rating_content,
                            customer: {
                                username: user.username,
                                customer_img_ava: user.customer_img_ava,
                                verify_purchased: true, // hoặc giá trị thích hợp nếu có
                            },
                        }); // Pass the new review object to the callback
                        setReview({ ratingContent: '', amountStar: 0 });
                        setError(null);
                    } else {
                        setError('Phản hồi không phải JSON: ' + textData);
                    }
                }
            } else {
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await response.json();
                    console.error('Server error:', response.status, responseData);
                    setError(responseData.message || 'Không thể lưu đánh giá');
                } else {
                    const textData = await response.text();
                    console.error('Server returned non-JSON response:', textData);
                    setError(textData || 'Không thể lưu đánh giá');
                }
            }
        } catch (error) {
            console.error('Network or server error:', error);
            setError('Không thể lưu đánh giá');
        }
    };

    return (
        <div className="new-review-card">
            <div className="review-header">
                <div className="user-info">
                    <img src={user ? user.customer_img_ava : ''} alt="User Avatar" className="user-avatar" />
                    <span className="user-name">{user ? user.username : 'Guest'}</span>
                </div>
                <div className="review-rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span
                            key={index}
                            className={`star ${index < review.amountStar ? 'filled' : ''}`}
                            onClick={() => handleStarClick(index)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
            </div>
            <div className="review-content">
                <textarea
                    value={review.ratingContent}
                    onChange={handleContentChange}
                    placeholder="Viết đánh giá của bạn..."
                    rows="4"
                    className="review-textarea"
                />
            </div>
            <div className="review-footer">
                <span className="review-date">{new Date().toLocaleDateString()}</span>
                <button onClick={handleSubmit} className="submit-review-button">Gửi đánh giá</button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default NewReviewCard;
