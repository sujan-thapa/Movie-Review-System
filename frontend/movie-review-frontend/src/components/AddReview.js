import React, { useState } from 'react';
import axios from 'axios';

const AddReview = () => {
  const [movieId, setMovieId] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { movie_id: movieId, user_id: userId, rating, comment };
    try {
      const response = await axios.post('http://localhost:8000/api/add_review.php', reviewData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);  // Log the response to check its structure
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response ? error.response.data.error : "An error occurred");
    }
  };

  return (
    <div className="add-review">
      <h1>Add a New Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie ID:
          <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} />
        </label>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
};

export default AddReview;
