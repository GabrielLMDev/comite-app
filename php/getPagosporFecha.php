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

// Definir fechas de inicio y fin desde la solicitud (deberían enviarse desde JavaScript)
$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];

// Consulta SQL para seleccionar pagos en el rango de fechas y agrupar por empleado
$sql = "SELECT idEmpleado, SUM(monto) as total_pago
        FROM pagos
        WHERE fecha_pago BETWEEN '$fecha_inicio' AND '$fecha_fin'
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
