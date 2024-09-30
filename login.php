<?php
session_start();

// Get the username and password from the POST request
$username = $_POST['username'];
$password = $_POST['password'];

// Check if the login is for VrchatUser
if ($username === 'VrchatUser' && $password === 'Password123') {
    // Set session variables for Vrchat login
    $_SESSION['loggedin'] = true;
    $_SESSION['user'] = 'vrchat';  // Mark user as VRChat
    // Redirect to the restricted VRChat page
    header('Location: vrchat-page.php');
    exit;
}

// Check if the login is for your personal account (Admin)
elseif ($username === 'AdminUser' && $password === 'YourPassword') {
    // Set session variables for your admin login
    $_SESSION['loggedin'] = true;
    $_SESSION['user'] = 'admin';  // Mark user as admin
    // Redirect to your admin dashboard or main page
    header('Location: dashboard.php');
    exit;
}

// If the login credentials are wrong
else {
    // Redirect back to the login page with an error message
    header('Location: index.php?error=Invalid credentials');
    exit;
}
?>
