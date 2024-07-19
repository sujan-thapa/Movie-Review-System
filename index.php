<?php
// db_connect.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movie_reviews";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// add_review.php
if (isset($_POST['add_review'])) {
    $movie_id = $_POST['movie_id'];
    $user_id = $_POST['user_id'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    $sql = "INSERT INTO reviews (movie_id, user_id, rating, comment) VALUES ('$movie_id', '$user_id', '$rating', '$comment')";

    if ($conn->query($sql) === TRUE) {
        echo "New review added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// view_reviews.php
if (isset($_GET['view_reviews'])) {
    $sql = "SELECT movies.title, reviews.rating, reviews.comment, reviews.review_date, users.username 
            FROM reviews 
            JOIN movies ON reviews.movie_id = movies.movie_id 
            JOIN users ON reviews.user_id = users.user_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "Movie: " . $row["title"]. " - Rating: " . $row["rating"]. " - Comment: " . $row["comment"]. " - User: " . $row["username"]. " - Date: " . $row["review_date"]. "<br>";
        }
    } else {
        echo "0 results";
    }
}

// update_review.php
if (isset($_POST['update_review'])) {
    $review_id = $_POST['review_id'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    $sql = "UPDATE reviews SET rating='$rating', comment='$comment' WHERE review_id='$review_id'";

    if ($conn->query($sql) === TRUE) {
        echo "Review updated successfully";
    } else {
        echo "Error updating review: " . $conn->error;
    }
}

// delete_review.php
if (isset($_POST['delete_review'])) {
    $review_id = $_POST['review_id'];

    $sql = "DELETE FROM reviews WHERE review_id='$review_id'";

    if ($conn->query($sql) === TRUE) {
        echo "Review deleted successfully";
    } else {
        echo "Error deleting review: " . $conn->error;
    }
}

$conn->close();
?>
