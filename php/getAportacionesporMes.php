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
$mesSeleccionado = $_GET['mes']; 

$sql = "SELECT * FROM aportaciones WHERE resumenMensual LIKE '%$mesSeleccionado%'
        ORDER BY resumenMensual ASC, folio ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $egresos = array();
    while ($row = $result->fetch_assoc()) {
        $egresos[] = $row;
    }
    echo json_encode($egresos);
} else {
    echo json_encode(array());
}

$conn->close();
