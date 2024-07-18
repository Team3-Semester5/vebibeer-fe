import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteRatingModal from './DeleteRatingModal';
import { API_URL, API_URL1 } from '../../../../constaint/fetchApi';

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
            const response = await fetch(`${API_URL}/rating/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRatings(data);
            setFilteredRatings(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching ratings:', error);
        }
    };

    fetchRatings();
}, []);

useEffect(() => {
    const filtered = ratings.filter(rating =>
        rating.rating_content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRatings(filtered);
}, [searchTerm, ratings]);

const handleDeleteRating = (ratingId) => {
    const updatedRatings = ratings.filter(rating => rating.rating_id !== ratingId);
    setRatings(updatedRatings);
    setFilteredRatings(updatedRatings);
    setShowDeleteModal(false);
};

const handleOpenDeleteModal = (rating) => {
    setSelectedRating(rating);
    setShowDeleteModal(true);
};

return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Ratings List</h2>
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredRatings.map(rating => (
                    <tr key={rating.rating_id}>
                        <td>{rating.rating_id}</td>
                        <td>{rating.amount_star}</td>
                        <td>{rating.rating_content}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleOpenDeleteModal(rating)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showDeleteModal && (
            <DeleteRatingModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDelete={() => handleDeleteRating(selectedRating.rating_id)}
            />
        )}
    </div>
);
}

export default ListRatings;