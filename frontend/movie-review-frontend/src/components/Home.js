import React from 'react';

const Home = ({ movies }) => {
  return (
    <div className="home">
      <h1>Movies Available for Review</h1>
      <div className="movie-list">
        {movies.length ? movies.map((movie) => (
          <div key={movie.movie_id} className="movie-item">
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Director: {movie.director}</p>
          </div>
        )) : <p>No movies available</p>}
      </div>
    </div>
  );
};

export default Home;
