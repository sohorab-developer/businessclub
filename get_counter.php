<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db_connect.php';

$response = array();
$response['success'] = false;

try {
    // Query to get all stats
    $sql = "SELECT stat_name, stat_value FROM site_stats";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $response['success'] = true;
        $response['data'] = array();
        
        while($row = $result->fetch_assoc()) {
            $response['data'][$row['stat_name']] = (int)$row['stat_value'];
        }
        
        // Add some random increment for demonstration (you can remove this in production)
        // This simulates real-time growth
        $response['data']['participants'] += rand(1, 10);
        $response['data']['segments'] += rand(0, 1);
        $response['data']['institutions'] += rand(0, 2);
        
    } else {
        $response['error'] = "No data found";
    }
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
$conn->close();
?>