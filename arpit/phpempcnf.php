<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "employees";
$charset = "utf8";
$port = 3307;

$dsn = "mysql:host=$servername;dbname=$db;port=$port;charset=$charset";

try {
    $pdo = new PDO($dsn, $username, $password);
    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; 
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
