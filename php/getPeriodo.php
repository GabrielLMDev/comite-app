<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "America.10";
$database = "comite-app";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}
$sql = "SELECT * FROM periodos";
$result = $conn->query($sql);
$periodos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $periodos[] = $row;
    }
    echo json_encode($periodos);
} else {
    echo "No se encontraron registros en la tabla 'periodos'.";
}
$conn->close();
