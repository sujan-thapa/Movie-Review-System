<?php
$servername = "localhost";
$username = "root";
$password = "your_password"; // Replace 'your_password' with your MySQL root password
$dbname = "movie_reviews";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
