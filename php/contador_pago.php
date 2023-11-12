<?php
//Version 2 - STABLE//
$servername = "localhost";
$username = 'u486552643_root';
$password = 'Comite.App2023';
$database = 'u486552643_ComiteApp';
$cliente = $_POST['cliente'];

$total_registros;
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}
$sql = "SELECT COUNT(*) as total_registros FROM periodos";
$result = $conn->query($sql);
if ($result) {
    // Obtiene el resultado como un arreglo asociativo
    $row = $result->fetch_assoc();
    $total_registros['totales'] = $row['total_registros'] - 1;

    $sql = "SELECT idCliente,
    SUM(CASE WHEN Periodo1 = 'PAGADO' THEN 1 ELSE 0 END +
        CASE WHEN Periodo2 = 'PAGADO' THEN 1 ELSE 0 END +
        CASE WHEN Periodo3 = 'PAGADO' THEN 1 ELSE 0 END) AS periodos_pagados
FROM clientes_periodo
WHERE idCliente = " . $cliente;
    $result = $conn->query($sql);
    if ($result) {
        $row1 = $result->fetch_assoc();
        $total_registros['pagados'] = $row1['periodos_pagados'];
        echo json_encode($total_registros);
    } else {
        echo json_encode("Error al ejecutar la consulta: " . $conn->error);
    }
} else {
    echo json_encode("Error al ejecutar la consulta: " . $conn->error);
}

// Cierra la conexión a la base de datos
$conn->close();
