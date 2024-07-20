import React, { useState } from 'react';
import axios from 'axios';
import './AddMovie.css';

const AddMovie = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');

  const handleQueryChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fb4b6aba9bac83694a1bc4e335584dd6&query=${value}`);
      setSuggestions(response.data.results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie) => {
    setSelectedMovie(movie);
    setQuery(movie.title);
    setSuggestions([]);
  };

  const handleAddMovie = async () => {
    if (selectedMovie) {
      try {
        const response = await axios.post('http://localhost:8000/api/fetch_and_add_movie.php', {
          movieTitle: selectedMovie.title,
          genre,
          director,
        }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        alert(response.data.message);
        fetchMovies(); // Refresh the movie list
        setQuery('');
        setGenre('');
        setDirector('');
        setSelectedMovie(null);
      } catch (error) {
        console.error('Error:', error);
        alert(error.response ? error.response.data.error : 'An error occurred');
      }
    } else {
      alert('Please select a movie from the suggestions');
    }
  };

  return (
    <div className="add-movie">
      <h2>Add a New Movie</h2>
      <input
        type="text"
        placeholder="Start typing a movie title..."
        value={query}
        onChange={handleQueryChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie) => (
            <li key={movie.id} onClick={() => handleSuggestionClick(movie)}>
              {movie.title} ({movie.release_date})
            </li>
          ))}
        </ul>
      )}
      {selectedMovie && (
        <>
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <button onClick={handleAddMovie}>Add Movie</button>
        </>
      )}
    </div>
  );
};

export default AddMovie;
