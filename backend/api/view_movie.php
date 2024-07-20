<?php
include '../config/db_connect.php';
include 'cors.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM movies WHERE movie_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $movie = $result->fetch_assoc();
        echo json_encode($movie);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Movie not found"]);
    }
}

$conn->close();
?>
