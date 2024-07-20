<?php
include '../config/db_connect.php';
include 'cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $review_id = $_POST['review_id'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    $sql = "UPDATE reviews SET rating='$rating', comment='$comment' WHERE review_id='$review_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Review updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating review: " . $conn->error]);
    }
}

$conn->close();
?>
