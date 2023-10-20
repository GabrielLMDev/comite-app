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
$mesSeleccionado = $_GET['mes']; // Asegúrate de que este nombre coincida con el valor enviado desde JavaScript

// Consulta SQL para seleccionar registros de la tabla "nominas" según el mes seleccionado
$sql = "SELECT *
        FROM nominas
        WHERE resumenMensual LIKE '%$mesSeleccionado%'
        ORDER BY resumenMensual ASC, 
        nAsalariado ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $nominas = array();
    while ($row = $result->fetch_assoc()) {
        $nominas[] = $row;
    }
    echo json_encode($nominas);
} else {
    echo json_encode(array());
}

$conn->close();
