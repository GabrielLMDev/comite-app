<?php
    // Conectar a la base de datos (cambia estos valores según tu configuración)
    $conexion = new mysqli("localhost", "root", "America.10", "comite-app");
    
    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error en la conexión: " . $conexion->connect_error);
    }
    
    // Consulta SQL para obtener los datos de la tabla
    $query = "SELECT idEmpleado, concepto, fecha FROM empleado_movimientos";
    $resultado = $conexion->query($query);
    
    // Verificar si la consulta fue exitosa
    if ($resultado) {
        // Inicializar un array para almacenar los datos
        $datos = array();
    
        // Recorrer el resultado y almacenar los datos en el array
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }
    
        // Cerrar la conexión a la base de datos
        $conexion->close();
        echo json_encode($datos);
    
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }
