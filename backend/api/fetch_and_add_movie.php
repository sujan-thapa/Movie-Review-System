<?php
include 'cors.php';
include '../config/db_connect.php';

session_start();
if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    http_response_code(403);
    echo json_encode(["error" => "Access denied"]);
    exit;
}

$apiKey = 'fb4b6aba9bac83694a1bc4e335584dd6'; // Your TMDb API key

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['movieTitle'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    $movieTitle = $data['movieTitle'];
    $movieTitleEncoded = urlencode($movieTitle);

    $tmdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=$apiKey&query=$movieTitleEncoded";
    $tmdbResponse = file_get_contents($tmdbUrl);
    $tmdbData = json_decode($tmdbResponse, true);

    if (isset($tmdbData['results'][0])) {
        $movieData = $tmdbData['results'][0];
        $title = $movieData['title'];
        $releaseDate = $movieData['release_date'];
        $posterUrl = "https://image.tmdb.org/t/p/w500" . $movieData['poster_path'];

        $genre = isset($data['genre']) ? $data['genre'] : 'Unknown';
        $director = isset($data['director']) ? $data['director'] : 'Unknown';

        $sql = "INSERT INTO movies (title, genre, release_date, director, poster_url) VALUES ('$title', '$genre', '$releaseDate', '$director', '$posterUrl')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Movie added successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Movie not found on TMDb"]);
    }
}

$conn->close();
?>
