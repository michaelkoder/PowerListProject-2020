<?php

/*
$servername = "mysql5-10.pro";
$username = "mistermitest";
$password = "iochimi12";
$dbname = "mistermitest";
*/

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "justdolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


?>