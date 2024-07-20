import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = ({ movies, fetchMovies, isAdmin }) => {

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete('http://localhost:8000/api/delete_movie.php', {
        data: { movie_id: movieId },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      alert(response.data.message);
      fetchMovies(); // Refresh the movie list
    } catch (error) {
      console.error('Error:', error);
      alert(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="home">
      <h1>Movies Available for Review</h1>
      <div className="movie-list">
        {movies.length ? (
          movies.map((movie) => (
            <div key={movie.movie_id} className="movie-item">
              <Link to={`/movie/${movie.movie_id}`} className="movie-link">
                <h2>{movie.title}</h2>
                <img src={movie.poster_url} alt={`${movie.title} poster`} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                <p>Genre: {movie.genre}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Director: {movie.director}</p>
              </Link>
              {isAdmin && (
                <button onClick={() => handleDeleteMovie(movie.movie_id)}>Delete Movie</button>
              )}
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
