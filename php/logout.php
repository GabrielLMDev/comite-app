<?php
require 'database.php';
$user = $_POST['user'];
$concept = 'CIERRE DE SESION';
$sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto) VALUES (:user, :concepto)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user', $user);
$stmt->bindParam(':concepto', $concept);
if ($stmt->execute()) {
  echo json_encode('Ok');
} else {
  echo json_encode('Error 210');
}
