<?php
require 'database.php';
$usuario_login = $_POST['user'];
$pass_login = $_POST['password'];
$datos;

if ($usuario_login === '' || $pass_login === '') {
  echo json_encode('Error 03');
} else {
  $records = $conn->prepare('SELECT idEmpleado, password, tipo, rol FROM empleados WHERE idEmpleado = :user');
  $records->bindParam(':user', $usuario_login);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  if ($results > 0) {
    if (password_verify($_POST['password'], $results['password'])) {
      $tipo = $results['tipo'];
      $rol = $results['rol'];
      setMov($tipo, $rol);
    } else {
      echo json_encode('Error 02');
    }
  } else {
    echo json_encode('Error 01');
  }
}
function setMov($tipo, $rol)
{
  require 'database.php';
  $concept = 'INICIO DE SESION';
  $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto) VALUES (:user, :concepto)";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':user', $_POST['user']);
  $stmt->bindParam(':concepto', $concept);
  if ($stmt->execute()) {
    $datos['usuario'] = $_POST['user'];
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
