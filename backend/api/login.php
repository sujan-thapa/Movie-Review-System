<?php
include 'cors.php';
include '../config/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        error_log("Username: " . $username);
        error_log("Password: " . $password);

        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            error_log("User found: " . print_r($user, true));
            if (password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['is_admin'] = $user['is_admin'];
                setcookie("is_admin", $user['is_admin'], time() + (86400 * 30), "/"); // Set a cookie for 30 days
                echo json_encode(["message" => "Login successful", "is_admin" => $user['is_admin']]);
            } else {
                error_log("Invalid password for user: " . $username);
                http_response_code(401);
                echo json_encode(["error" => "Invalid password"]);
            }
        } else {
            error_log("User not found: " . $username);
            http_response_code(404);
            echo json_encode(["error" => "User not found"]);
        }
    } else {
        error_log("Username or password not provided");
        http_response_code(400);
        echo json_encode(["error" => "Username or password not provided"]);
    }
}

$conn->close();
?>
