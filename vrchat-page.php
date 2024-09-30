<?php
session_start();
if ($_SESSION['user'] !== 'vrchat') {
    header('Location: index.php');
    exit;
}
?>
<h1>Welcome, Vrchat User!</h1>
