<?php
//Version 2 - STABLE//
$servername = "localhost";
$username = 'u486552643_root';
$password = 'Comite.App2023';
$database = 'u486552643_ComiteApp';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$mesSeleccionado = $_GET['mes'];

// Consulta SQL para seleccionar registros de la tabla "nominas" según el mes seleccionado
$sql = "SELECT SUM(monto) AS total_de_importes FROM pagos 
WHERE resumenMensual LIKE'%$mesSeleccionado%'";

$result = $conn->query($sql);
if ($result) {
    $row = $result->fetch_assoc();
    $totalImportes = $row['total_de_importes'];
    echo json_encode($totalImportes);
}
$conn->close();
