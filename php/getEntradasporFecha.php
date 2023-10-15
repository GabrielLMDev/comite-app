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

$sql_total_pagos = "SELECT SUM(monto) as total_pagos
        FROM pagos
        WHERE fecha_pago BETWEEN '$fecha_inicio' AND '$fecha_fin'";

$result_total_pagos = $conn->query($sql_total_pagos);
$total_pagos = $result_total_pagos->fetch_assoc()['total_pagos'];

// Cerrar la conexión a la base de datos
$conn->close();

// Enviar el total de pagos a la respuesta JSON
$response = array(
    'total_pagos' => $total_pagos
);

echo json_encode($response);
