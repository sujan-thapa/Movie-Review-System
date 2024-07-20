<?php
include 'cors.php';
include '../config/db_connect.php';

session_start();
if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    http_response_code(403);
    echo json_encode(["error" => "Access denied"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['movie_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Movie ID not provided"]);
        exit;
    }

    $movieId = $data['movie_id'];

    $sql = "DELETE FROM movies WHERE movie_id = $movieId";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Movie deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>
