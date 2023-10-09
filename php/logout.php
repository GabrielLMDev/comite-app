<?php
require 'database.php';
session_start();
$user = $_POST['user'];
$concept = 'CIERRE DE SESION';
$sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto) VALUES (:user, :concepto)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user', $user);
$stmt->bindParam(':concepto', $concept);
if ($stmt->execute()) {
  $_SESSION['user_id'];
  session_unset();
  session_destroy();
  echo json_encode('Ok');
} else {
  echo json_encode('Error 210');
}