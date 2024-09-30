<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MrBoys VIP</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="welcome-container">
        <h1>Welcome to the VIP Area</h1>
        <p>Exclusive content for logged-in users only!</p>
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
