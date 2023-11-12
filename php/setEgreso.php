<?php
//Version 2 - STABLE//
require 'database.php';
$concepto = $_GET['concepto'];
$beneficiario = $_GET['beneficiario'];
$monto = $_GET['monto'];
$cookie_name = "userId";
$cookie_value = json_decode($_COOKIE[$cookie_name], true);
$idEmpleado = $cookie_value['id'];
$nombre = $cookie_value['nombre'];
$n_documento = $_GET['folio'];
$folio = crear_folio();
$pasar_folio;

$sql = "INSERT INTO egresos (concepto, beneficiario, monto, idEmpleado, nomEmpleado, folio, n_documento) 
VALUES (:concepto, :beneficiario, :monto, :idEmpleado, :nomEmpleado, :folio, :n_documento)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':concepto', $concepto);
$stmt->bindParam(':beneficiario', $beneficiario);
$stmt->bindParam(':monto', $monto);
$stmt->bindParam(':idEmpleado', $idEmpleado);
$stmt->bindParam(':nomEmpleado', $nombre);
$stmt->bindParam(':folio', $folio);
$stmt->bindParam(':n_documento', $n_documento);

if ($stmt->execute()) {
    setMov($folio, $monto, $beneficiario, $idEmpleado, $nombre);
} else {
    echo json_encode('Error 947');
}


function setMov($folio, $monto, $beneficiario, $idEmpleado, $nombre)
{
    require 'database.php';
    $concept = "EGRESO POR $" . $monto . " A BENEFICIARIO: " . $beneficiario . " CON NUMERO DE FOLIO: " . $folio;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, nombre, concepto, folio_egreso) 
    VALUES (:user, :nombre, :concepto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $idEmpleado);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':concepto', $concept);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        $pasar_folio['folio'] = $folio;
        echo json_encode($pasar_folio);
    } else {
        echo json_encode('Error 948');
    }
}
function crear_folio()
{
    // Conexión a la base de datos
    $conn = new mysqli("localhost", "u486552643_root", "Comite.App2023", "u486552643_ComiteApp");

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Consultar el último folio
    $query = "SELECT folio FROM egresos ORDER BY id DESC LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastFolio = $row["folio"];
        $folioNumber = intval(substr($lastFolio, 2)) + 1;
    } else {
        $folioNumber = 1;
    }

    // Generar el nuevo folio con el formato 'AC0001'
    $newFolio = 'CE' . str_pad($folioNumber, 5, '0', STR_PAD_LEFT);

    // Insertar el pago en la base de datos con el nuevo folio

    return $newFolio;
}
