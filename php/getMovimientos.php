<?php
    //Version 2 - STABLE//
    $conexion = new mysqli("localhost", "u486552643_root", "Comite.App2023", "u486552643_ComiteApp");
    
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
