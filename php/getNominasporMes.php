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

// Obtenemos el mes seleccionado desde JavaScript
$mesSeleccionado = $_GET['mes']; // Asegúrate de que este nombre coincida con el valor enviado desde JavaScript

// Consulta SQL para seleccionar registros de la tabla "nominas" según el mes seleccionado
$sql = "SELECT n.*, de.nombre AS nombre_empleado, es.nombre AS nombre_salario
FROM nominas n
INNER JOIN datos_empleado de ON n.idEmpleado = de.idEmpleado
INNER JOIN empleados_salarios es ON n.nAsalariado = es.nEmpleado
WHERE n.resumenMensual LIKE '%$mesSeleccionado%'
ORDER BY n.resumenMensual ASC, n.nAsalariado ASC";

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
