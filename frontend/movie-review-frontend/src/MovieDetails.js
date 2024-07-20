import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewAction, setReviewAction] = useState('');
  const [reviewData, setReviewData] = useState({
    movieId: id,
    userId: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/view_movie.php?id=${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/view_reviews.php?movie_id=${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchMovie();
    fetchReviews();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/${reviewAction}_review.php`;
    try {
      const response = await axios.post(url, reviewData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert(response.data.message);
      setReviewData({
        movieId: id,
        userId: '',
        rating: '',
        comment: '',
      });
      setReviewAction('');
      // Refresh reviews after adding/updating/deleting
      const refreshedReviews = await axios.get(`http://localhost:8000/api/view_reviews.php?movie_id=${id}`);
      setReviews(refreshedReviews.data);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response ? error.response.data.error : "An error occurred");
    }
  };

  const openReviewModal = (action, review = null) => {
    setReviewAction(action);
    if (review) {
      setReviewData({
        movieId: id,
        userId: review.user_id,
        rating: review.rating,
        comment: review.comment,
      });
    } else {
      setReviewData({
        movieId: id,
        userId: '',
        rating: '',
        comment: '',
      });
    }
  };

  const closeReviewModal = () => {
    setReviewAction('');
    setReviewData({
      movieId: id,
      userId: '',
      rating: '',
      comment: '',
    });
  };

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>Genre: {movie.genre}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Director: {movie.director}</p>
          <div className="reviews">
            <h2>Reviews</h2>
            <button onClick={() => openReviewModal('add')}>Add Review</button>
            {reviews.length ? (
              reviews.map((review) => (
                <div key={review.review_id} className="review-item">
                  <p>User: {review.user_id}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  <button onClick={() => openReviewModal('update', review)}>Update Review</button>
                  <button onClick={() => openReviewModal('delete', review)}>Delete Review</button>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </>
      )}

      {reviewAction && (
        <div className="modal">
          <div className="modal-content">
            <h2>{reviewAction.charAt(0).toUpperCase() + reviewAction.slice(1)} Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <label>
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={reviewData.userId}
                  onChange={handleReviewChange}
                />
              </label>
              <label>
                Rating:
                <input
                  type="number"
                  name="rating"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  min="1"
                  max="10"
                />
              </label>
              <label>
                Comment:
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                />
              </label>
              <button type="submit">{reviewAction.charAt(0).toUpperCase() + reviewAction.slice(1)} Review</button>
              <button type="button" onClick={closeReviewModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
