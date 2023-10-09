<?php
require 'database.php';
$usuario = $_POST['user'];
$empleado;
$records = $conn->prepare('SELECT idEmpleado, nombre FROM datos_empleado WHERE idEmpleado = :user');
  $records->bindParam(':user', $usuario);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  if ($results > 0) {
    $empleado['id'] = $results['idEmpleado'];
    $empleado['nombre'] = $results['nombre'];
    echo json_encode($empleado);
    }
