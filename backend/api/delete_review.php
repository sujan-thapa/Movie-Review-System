<?php
include '../config/db_connect.php';
include 'cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $review_id = $_POST['review_id'];

    $sql = "DELETE FROM reviews WHERE review_id='$review_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Review deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting review: " . $conn->error]);
    }
}

$conn->close();
?>
