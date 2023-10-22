<?php

// Conexión a la base de datos
$servername = "localhost";
$username = 'u486552643_root';
$password = 'Comite.App2023';
$database = 'u486552643_ComiteApp';

$conexion = new mysqli($servername, $username, $password, $database);

if ($conexion->connect_error) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

// Obtener el ID de la imagen a mostrar (puedes pasarlo como parámetro en la URL)
$id_imagen = $_GET['id']; // Supongamos que pasas el ID de la imagen como un parámetro GET

$query = "SELECT nombre, formato_Foto, foto FROM datos_empleado WHERE idEmpleado = $id_imagen";
$resultado = $conexion->query($query);

if ($resultado) {
    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        $nombre = $fila['nombre'];
        $tipo = $fila['formato_Foto'];
        $imagen = $fila['foto'];

        header("Content-type: $tipo");
        header("Content-Disposition: inline; filename=$nombre");
        echo $imagen;
    } else {
        echo "No se encontró la imagen.";
    }
} else {
    echo "Error al consultar la base de datos: " . $conexion->error;
}

$conexion->close();
