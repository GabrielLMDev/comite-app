<?php
//Version 2 - STABLE//
require 'database.php';
$usuario = $_GET['user'];
$empleado;
$records = $conn->prepare('SELECT * FROM datos_empleado WHERE idEmpleado = :user');
  $records->bindParam(':user', $usuario);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  if ($results > 0) {
    $empleado['id'] = $results['idEmpleado'];
    $empleado['nombre'] = $results['nombre'];
    $empleado['zona'] = $results['zona'];
    echo json_encode($empleado);
    }
