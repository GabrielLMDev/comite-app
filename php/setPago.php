<?php
//Version 2 - STABLE//
require 'database.php';

$idContrato = $_GET['contrato'];
$idCliente = $_GET['cliente'];
$cookie_name = "userId";
$cookie_value = json_decode($_COOKIE[$cookie_name], true);
$idEmpleado = $cookie_value['id'];
$nombre = $cookie_value['nombre'];
$idPeriodo = $_GET['id_periodo'];
$Obs = $_GET['obs'];
$Monto = $_GET['montoPago'];
$folio = crear_folio();
$pasar_folio;

$records = $conn->prepare('SELECT * FROM pagos WHERE idCliente = :cliente AND idPeriodo = :periodo');
$records->bindParam(':cliente', $idCliente);
$records->bindParam(':periodo', $idPeriodo);
$records->execute();
$results = $records->fetch(PDO::FETCH_ASSOC);
if ($results > 0) {
    echo json_encode('Pagado');
} else {

    $sql = "INSERT INTO pagos (idCliente, idContrato, idEmpleado, idPeriodo, observaciones, monto, folio) VALUES (:idCliente, :idContrato, :idEmpleado, :idPeriodo, :observaciones, :monto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idCliente', $idCliente);
    $stmt->bindParam(':idContrato', $idContrato);
    $stmt->bindParam(':idEmpleado', $idEmpleado);
    $stmt->bindParam(':idPeriodo', $idPeriodo);
    $stmt->bindParam(':observaciones', $Obs);
    $stmt->bindParam(':monto', $Monto);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        setMov($folio, $Monto, $idCliente, $idEmpleado, $nombre, $idPeriodo);
    } else {
        echo json_encode('Error 947');
    }
}


function setMov($folio, $Monto, $idCliente, $idEmpleado, $nombre, $idPeriodo)
{
    require 'database.php';
    $concept = "PAGO POR $" . $Monto . " DE CLIENTE " . $idCliente;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, nombre, concepto, folio) VALUES (:user, :nombre, :concepto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $idEmpleado);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':concepto', $concept);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        if ($idPeriodo == 10) {
            actualizarPeriodos($idCliente, $folio);
        } else {
            actualizarPeriodo($idCliente, $folio, $idPeriodo);
        }
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
    $query = "SELECT folio FROM pagos WHERE folio != 'NULL' ORDER BY idPago DESC LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastFolio = $row["folio"];
        $folioNumber = intval(substr($lastFolio, 2)) + 1;
    } else {
        $folioNumber = 1;
    }

    // Generar el nuevo folio con el formato 'AC0001'
    $newFolio = 'AC' . str_pad($folioNumber, 5, '0', STR_PAD_LEFT);

    // Insertar el pago en la base de datos con el nuevo folio

    return $newFolio;
}

function actualizarPeriodos($idCliente, $folio)
{
    require 'database.php';
    $sql = "UPDATE `clientes_periodo` 
    SET `Periodo1`='PAGADO',`Periodo2`='PAGADO',`Periodo3`='PAGADO' 
    WHERE `idCliente` = :idCliente";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idCliente', $idCliente);
    if ($stmt->execute()) {
        $pasar_folio['folio'] = $folio;
        echo json_encode($pasar_folio);
    } else {
        echo json_encode('Error 117');
    }
}
function actualizarPeriodo($idCliente, $folio, $idPeriodo)
{
    require 'database.php';
    $sql = "UPDATE `clientes_periodo` SET `Periodo" . $idPeriodo . "`='PAGADO' WHERE `idCliente` = :idCliente";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idCliente', $idCliente);
    if ($stmt->execute()) {
        $pasar_folio['folio'] = $folio;
        echo json_encode($pasar_folio);
    } else {
        echo json_encode('Error 117');
    }
}
