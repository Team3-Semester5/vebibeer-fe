import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteRatingModal({ show, onHide, onDelete, ratingId }) {
    const [error, setError] = React.useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/rating/delete/${ratingId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Rating deleted successfully');
            onDelete(); // Call the passed onDelete function to update the parent state
            onHide();
        } catch (error) {
            console.error('Failed to delete rating', error);
            setError(`Failed to delete rating: ${error.message}`);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this rating?</p>
                {error && <p className="text-danger">Error: {error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteRatingModal;