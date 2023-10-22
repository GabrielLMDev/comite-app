<?php
require 'database.php';

$donante = $_GET['donante'];
$beneficiario = $_GET['beneficiario'];
$monto = $_GET['monto'];
$tipo = $_GET['tipo'];
$metodo = $_GET['metodo'];
$n_documento = $_GET['folio'];
$concepto = $_GET['concepto'];
$idEmpleado = $_COOKIE['userId'];
$folio = crear_folio();
$pasar_folio;

$sql = "INSERT INTO aportaciones (folio, donante, beneficiario, monto, tipo, concepto, metodo_pago, folio_documento, idEmpleado) 
VALUES (:folio, :donante, :beneficiario, :monto, :tipo, :concepto, :metodo_pago, :folio_documento, :idEmpleado)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':folio', $folio);
$stmt->bindParam(':donante', $donante);
$stmt->bindParam(':beneficiario', $beneficiario);
$stmt->bindParam(':monto', $monto);
$stmt->bindParam(':tipo', $tipo);
$stmt->bindParam(':concepto', $concepto);
$stmt->bindParam(':metodo_pago', $metodo);
$stmt->bindParam(':folio_documento', $n_documento);
$stmt->bindParam(':idEmpleado', $idEmpleado);

if ($stmt->execute()) {
    setMov($folio, $monto, $beneficiario);
} else {
    echo json_encode('Error 947');
}


function setMov($folio, $monto, $beneficiario)
{
    require 'database.php';
    $concept = "APORTACION POR $" . $monto . " A BENEFICIARIO: " . $beneficiario . " CON NUMERO DE FOLIO: " . $folio;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto, folio_aportacion) VALUES (:user, :concepto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $_COOKIE['userId']);
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
    $query = "SELECT folio FROM aportaciones ORDER BY id DESC LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastFolio = $row["folio"];
        $folioNumber = intval(substr($lastFolio, 2)) + 1;
    } else {
        $folioNumber = 1;
    }

    // Generar el nuevo folio con el formato 'AC0001'
    $newFolio = 'FA' . str_pad($folioNumber, 5, '0', STR_PAD_LEFT);

    // Insertar el pago en la base de datos con el nuevo folio

    return $newFolio;
}
