<?php
session_start();
if ($_SESSION['user'] !== 'admin') {
    header('Location: index.php');
    exit;
}
?>
<h1>Welcome, Admin!</h1>
