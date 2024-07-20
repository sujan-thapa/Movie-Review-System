<?php
include 'cors.php';
session_start();
session_unset();
session_destroy();
setcookie("is_admin", "", time() - 3600, "/"); // Delete the admin cookie
echo json_encode(["message" => "Logout successful"]);
?>
