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

$nombre = $_GET['nombre'];
if ($nombre == '') {
    header('Content-Type: application/json');
    echo json_encode('');
} else {
    // Consulta SQL dinámica
    $sql = "SELECT * FROM empleados_salarios WHERE nombre LIKE '%" . $nombre . "%'";
    $result = $conn->query($sql);

    $resultados = array();

    if ($result->num_rows > 0) {
        // Almacena los resultados en un arreglo
        while ($row = $result->fetch_assoc()) {
            $resultados[] = array('nEmpleado' => $row['nEmpleado'], 'nombre' => $row['nombre'], 'puesto' => $row['puesto']);
        }
    }

    // Devuelve los resultados en formato JSON
    header('Content-Type: application/json');
    echo json_encode($resultados);
}



$conn->close();
