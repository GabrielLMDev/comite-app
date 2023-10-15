<?php
require 'database.php';
$idContrato = $_POST['contrato'];
$idCliente = $_POST['cliente'];
$idEmpleado = $_COOKIE['userId'];
$idPeriodo = $_POST['id_periodo'];
$Obs = $_POST['obs'];
$Monto = $_POST['montoPago'];
$folio = $_POST['newfolio'];

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
        setMov($folio, $Monto, $idCliente);
    } else {
        echo json_encode('Error 947');
    }
}

function setMov($folio, $Monto, $idCliente)
{
    require 'database.php';
    $concept = "PAGO POR $" . $Monto . " DE CLIENTE " . $idCliente;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto, folio) VALUES (:user, :concepto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $_COOKIE['userId']);
    $stmt->bindParam(':concepto', $concept);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        echo json_encode('Ok');
    } else {
        echo json_encode('Error 948');
    }
}
