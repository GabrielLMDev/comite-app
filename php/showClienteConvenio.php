<?php
//Version 2 - STABLE//
$conexion = new mysqli("localhost", "u486552643_root", "Comite.App2023", "u486552643_ComiteApp");
$cliente = $_GET['busqueda'];

if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

$query = "SELECT * FROM convenios WHERE idContrato = ? ORDER BY id DESC LIMIT 1";
$stmt = $conexion->prepare($query);

if ($stmt) {
    $stmt->bind_param("i", $cliente); // "i" indica que el parámetro es un entero
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $datos = array();
        while ($fila = $resultado->fetch_assoc()) {
            $datos = $fila;
        }
        $datos['PlazoPago'] = $datos['PlazoActual'] + 1;
        $stmt->close();
        $conexion->close();
        $datos['estatus'] = 'Ok';
        echo json_encode($datos);
    } else {
        echo json_encode('No_Existe');
    }
} else {
    $error = "Error en la preparación de la consulta: " . $conexion->error;
    echo json_encode($error);
}
