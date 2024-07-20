import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost/backend/api/view_reviews.php');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h1>View All Reviews</h1>
      {reviews.length ? reviews.map((review, index) => (
        <div key={index}>
          <h2>{review.title}</h2>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <p>User: {review.username}</p>
          <p>Date: {review.review_date}</p>
        </div>
      )) : <p>No reviews found.</p>}
    </div>
  );
};

export default ViewReviews;
