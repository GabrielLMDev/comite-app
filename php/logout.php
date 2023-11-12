<?php
//Version 2 - STABLE//
require 'database.php';
$user = $_GET['user'];
$nombre = $_GET['nombre'];
$concept = 'CIERRE DE SESION';
$sql = "INSERT INTO empleado_movimientos (idEmpleado, nombre, concepto) VALUES (:user, :nombre, :concepto)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user', $user);
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':concepto', $concept);
if ($stmt->execute()) {
  echo json_encode('Ok');
} else {
  echo json_encode('Error 210');
}
