<?php
//Version 2 - STABLE//
require 'database.php';
$usuario_login = $_GET['user'];
$pass_login = $_GET['password'];
$datos;

if ($usuario_login === '' || $pass_login === '') {
  echo json_encode('Error 03');
} else {
  $records = $conn->prepare('SELECT empleados.idEmpleado, empleados.password, empleados.tipo, empleados.rol, datos_empleado.nombre
  FROM empleados
  INNER JOIN datos_empleado ON empleados.idEmpleado = datos_empleado.idEmpleado
  WHERE empleados.idEmpleado = :user');
  $records->bindParam(':user', $usuario_login);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  if ($results > 0) {
    if (password_verify($_GET['password'], $results['password'])) {
      $tipo = $results['tipo'];
      $rol = $results['rol'];
      $nombre = $results['nombre'];
      setMov($tipo, $rol, $nombre);
    } else {
      echo json_encode('Error 02');
    }
  } else {
    echo json_encode('Error 01');
  }
}
function setMov($tipo, $rol, $nombre)
{
  require 'database.php';
  $concept = 'INICIO DE SESION';
  $sql = "INSERT INTO empleado_movimientos (idEmpleado, nombre, concepto) VALUES (:user, :nombre, :concepto)";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':user', $_GET['user']);
  $stmt->bindParam(':nombre', $nombre);
  $stmt->bindParam(':concepto', $concept);
  if ($stmt->execute()) {
    $datos['usuario'] = $_GET['user'];
    $datos['nombre'] = $nombre;
    $datos['tipo'] = $tipo;
    $datos['rol'] = $rol;
    $datos['fecha_sesion'] = date('Y-m-d');
    $datos['hora_sesion'] = date('H:i:s');
    $datos['estatus'] = 'Ok';
    echo json_encode($datos);
  } else {
    echo json_encode('Error 210');
  }
}
