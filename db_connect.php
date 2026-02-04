<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root'); // Change this to your database username
define('DB_PASS', ''); // Change this to your database password
define('DB_NAME', 'bfb_counter');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to UTF-8
$conn->set_charset("utf8");
?>






<!-- 

CREATE DATABASE IF NOT EXISTS bfb_counter;
USE bfb_counter;

CREATE TABLE IF NOT EXISTS site_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_name VARCHAR(50) UNIQUE NOT NULL,
    stat_value INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO site_stats (stat_name, stat_value) VALUES
('participants', 5000),
('segments', 30),
('institutions', 100),
('years_legacy', 50); -->