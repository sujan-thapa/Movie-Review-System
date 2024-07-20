import React, { useState } from 'react';
import axios from 'axios';

const DeleteReview = () => {
  const [reviewId, setReviewId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/backend/api/delete_review.php', { review_id: reviewId }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Delete a Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review ID:
          <input type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} />
        </label>
        <button type="submit">Delete Review</button>
      </form>
    </div>
  );
};

export default DeleteReview;
