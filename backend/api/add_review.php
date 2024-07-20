<?php
include '../config/db_connect.php';
include 'cors.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['movieId']) || !isset($data['username']) || !isset($data['rating']) || !isset($data['comment'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    $movie_id = $data['movieId'];
    $username = $data['username'];
    $rating = $data['rating'];
    $comment = $data['comment'];

    $sql = "INSERT INTO reviews (movie_id, username, rating, comment) VALUES ('$movie_id', '$username', '$rating', '$comment')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "New review added successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>
