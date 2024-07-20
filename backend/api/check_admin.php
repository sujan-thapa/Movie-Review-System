<?php
include 'cors.php';
session_start();

if (isset($_SESSION['is_admin'])) {
    echo json_encode(["is_admin" => $_SESSION['is_admin']]);
} else {
    http_response_code(401);
    echo json_encode(["is_admin" => false]);
}
?>
