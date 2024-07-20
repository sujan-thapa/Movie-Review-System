import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import AddMovie from './components/AddMovie';
import axios from 'axios';
import './App.css';
import './Home.css';
import './MovieDetail.css';
import './Login.css';
import './AddMovie.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/view_movies.php');
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert(error.message || "An error occurred");
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check_admin.php', {
        withCredentials: true
      });
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout.php', {}, {
        withCredentials: true
      });
      setIsAdmin(false);
      window.location.href = '/login'; // Use window.location.href for a simpler approach
    } catch (error) {
      console.error("Error logging out:", error);
      alert(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchMovies();
    checkAdminStatus();
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          {!isAdmin && <Link to="/login">Admin Login</Link>}
          {isAdmin && <Link to="/add-movie">Add Movie</Link>}
          {isAdmin && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <Routes>
          <Route path="/" element={<Home movies={movies} fetchMovies={fetchMovies} isAdmin={isAdmin} />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} fetchMovies={fetchMovies} />} />
          <Route path="/add-movie" element={<AddMovie fetchMovies={fetchMovies} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
