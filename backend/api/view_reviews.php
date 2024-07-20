<?php
include '../config/db_connect.php';
include 'cors.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_GET['movie_id'])) {
    $movie_id = $_GET['movie_id'];
    $sql = "SELECT * FROM reviews WHERE movie_id = $movie_id";
    $result = $conn->query($sql);

    $reviews = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $reviews[] = $row;
        }
    }

    echo json_encode($reviews);
}

$conn->close();
?>
