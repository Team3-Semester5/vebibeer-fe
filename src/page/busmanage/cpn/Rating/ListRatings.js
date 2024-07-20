import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteRatingModal from './DeleteRatingModal';
import './ListRating.css';

function ListRatings() {
    const [ratings, setRatings] = useState([]);
    const [filteredRatings, setFilteredRatings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch('http://localhost:8080/rating/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRatings(data);
                filterRatings(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching ratings:', error);
            }
        };

        fetchRatings();
    }, []);

    useEffect(() => {
        filterRatings(ratings);
    }, [searchTerm, ratings]);

    const filterRatings = (ratings) => {
        const filtered = ratings.filter(rating =>
            !rating.rating_content.toLowerCase().startsWith('ban') &&
            rating.rating_content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRatings(filtered);
    };

    const handleDeleteRating = async (ratingId) => {
        try {
            const response = await fetch(`http://localhost:8080/rating/update/${ratingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating_content: 'Ban', amount_star: 0 }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedRatings = ratings.map(rating => 
                rating.rating_id === ratingId ? { ...rating, rating_content: 'Ban', amount_star: 0 } : rating
            );
            setRatings(updatedRatings);
            filterRatings(updatedRatings);
            setShowDeleteModal(false);
        } catch (error) {
            setError(error.message);
            console.error('Error updating rating:', error);
        }
    };

    const handleOpenDeleteModal = (rating) => {
        setSelectedRating(rating);
        setShowDeleteModal(true);
    };

    const renderStars = (amount_star) => {
        return (
            <div>
                {[...Array(amount_star)].map((_, index) => (
                    <span key={index} className="star">★</span>
                ))}
                {[...Array(5 - amount_star)].map((_, index) => (
                    <span key={index} className="star" style={{ color: '#e4e5e9' }}>★</span>
                ))}
            </div>
        );
    };

    return (
        <div style={{marginTop: "120px"}}>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Ratings List</h1>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Ratings"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className="table table-striped table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Rating ID</th>
                            <th>Stars</th>
                            <th>Content</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRatings.map(rating => (
                            <tr key={rating.rating_id}>
                                <td>{rating.rating_id}</td>
                                <td>{renderStars(rating.amount_star)}</td>
                                <td>{rating.rating_content}</td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
               
            </div>
        </div>
    );
}

export default ListRatings;
