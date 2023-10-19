<?php
require 'database.php';
$idContrato = $_POST['contrato'];
$idCliente = $_POST['cliente'];
$idEmpleado = $_COOKIE['userId'];
$idPeriodo = $_POST['id_periodo'];
$Obs = $_POST['obs'];
$Monto = $_POST['montoPago'];
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
    $query = "SELECT folio FROM pagos ORDER BY idPago DESC LIMIT 1";
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
