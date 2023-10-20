<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "America.10";
$database = "comite-app";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtenemos el mes seleccionado desde JavaScript
$mesSeleccionado = $_GET['mes']; 

$sql = "SELECT * FROM egresos WHERE resumenMensual LIKE '%$mesSeleccionado%'
        ORDER BY resumenMensual ASC, folio ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $egresos = array();
    while ($row = $result->fetch_assoc()) {
        $egresos[] = $row;
    }
    echo json_encode($egresos);
} else {
    echo json_encode(array());
}

$conn->close();
