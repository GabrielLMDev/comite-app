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

$sql = "SELECT e.idEmpleado, de.nombre, SUM(p.monto) as total_pago
FROM datos_empleado de
INNER JOIN empleados e ON de.idEmpleado = e.idEmpleado
INNER JOIN pagos p ON e.idEmpleado = p.idEmpleado
WHERE p.resumenMensual LIKE '%$mesSeleccionado%'
GROUP BY e.idEmpleado";

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
