<?php
require 'database.php';
$concepto = $_POST['concepto'];
$beneficiario = $_POST['beneficiario'];
$monto = $_POST['monto'];
$idEmpleado = $_COOKIE['userId'];
$n_documento = $_POST['folio'];
$folio = crear_folio();
$pasar_folio;

$sql = "INSERT INTO egresos (concepto, beneficiario, monto, idEmpleado, folio, n_documento) VALUES (:concepto, :beneficiario, :monto, :idEmpleado, :folio, :n_documento)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':concepto', $concepto);
$stmt->bindParam(':beneficiario', $beneficiario);
$stmt->bindParam(':monto', $monto);
$stmt->bindParam(':idEmpleado', $idEmpleado);
$stmt->bindParam(':folio', $folio);
$stmt->bindParam(':n_documento', $n_documento);

if ($stmt->execute()) {
    setMov($folio, $monto, $beneficiario);
} else {
    echo json_encode('Error 947');
}


function setMov($folio, $monto, $beneficiario)
{
    require 'database.php';
    $concept = "EGRESO POR $" . $monto . " A BENEFICIARIO: " . $beneficiario . " CON NUMERO DE FOLIO: " . $folio;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto, folio_egreso) VALUES (:user, :concepto, :folio)";
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
    $conn = new mysqli("localhost", "root", "America.10", "comite-app");

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
