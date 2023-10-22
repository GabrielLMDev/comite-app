<?php
// Conexión a la base de datos
$servername = "localhost";
$username = 'u486552643_root';
$password = 'Comite.App2023';
$database = 'u486552643_ComiteApp';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$mesSeleccionado = $_GET['mes'];

$sql = "SELECT idEmpleado, SUM(monto) as total_pago
        FROM pagos
        WHERE resumenMensual LIKE '%$mesSeleccionado%'
        GROUP BY idEmpleado";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $pagos = array();
    while ($row = $result->fetch_assoc()) {
        $pagos[] = $row;
    }
    echo json_encode($pagos);
} else {
    echo json_encode(array());
}

$conn->close();
