-- Registering a MySQL Server
-- Create the database
CREATE DATABASE movie_reviews;

-- Create the movies table
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_date DATE,
    director VARCHAR(100)
);

-- Create the users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the reviews table
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert sample data into movies table
INSERT INTO movies (title, genre, release_date, director) VALUES
('Inception', 'Sci-Fi', '2010-07-16', 'Christopher Nolan'),
('The Godfather', 'Crime', '1972-03-24', 'Francis Ford Coppola');

-- Insert sample data into users table
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_doe', 'jane@example.com', 'password456');

-- Insert sample data into reviews table
INSERT INTO reviews (movie_id, user_id, rating, comment) VALUES
(1, 1, 9, 'Amazing movie with a mind-bending plot!'),
(2, 2, 10, 'A masterpiece of cinema. Timeless classic.');
