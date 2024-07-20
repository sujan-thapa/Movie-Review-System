import React, { useState } from 'react';
import axios from 'axios';

const UpdateReview = () => {
  const [reviewId, setReviewId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { review_id: reviewId, rating, comment };
    try {
      const response = await axios.post('http://localhost/backend/api/update_review.php', reviewData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Update a Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review ID:
          <input type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} />
        </label>
        <label>
          New Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" />
        </label>
        <label>
          New Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default UpdateReview;
