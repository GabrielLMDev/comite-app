<?php
require 'database.php';
$nEmpleado = $_GET['nEmpleado'];
$puesto = $_GET['puesto'];
$pago = $_GET['pago'];
$n_pago = $_GET['n_pago'];
$idEmpleado = $_COOKIE['userId'];
$sBase = $_GET['sBase'];
$sBonificacion = $_GET['sBonificacion'];
$sDeduccion = $_GET['sDeduccion'];
$folio = crear_folio();
$pasar_folio;

$sql = "INSERT INTO nominas (nAsalariado, salarioBase, bonificaciones, deducciones, idEmpleado, puesto, tipo, referencia, folio) 
VALUES (:nAsalariado, :salarioBase, :bonificaciones, :deducciones, :idEmpleado, :puesto, :tipo, :referencia, :folio)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':nAsalariado', $nEmpleado);
$stmt->bindParam(':salarioBase', $sBase);
$stmt->bindParam(':bonificaciones', $sBonificacion);
$stmt->bindParam(':deducciones', $sDeduccion);
$stmt->bindParam(':idEmpleado', $idEmpleado);
$stmt->bindParam(':puesto', $puesto);
$stmt->bindParam(':tipo', $pago);
$stmt->bindParam(':referencia', $n_pago);
$stmt->bindParam(':folio', $folio);


if ($stmt->execute()) {
    setMov($folio, $nEmpleado);
} else {
    echo json_encode('Error 947');
}


function setMov($folio, $nEmpleado)
{
    require 'database.php';
    $concept = "NOMINA REGISTRADA A EMPLEADO: " . $nEmpleado . " CON NUMERO DE FOLIO: " . $folio;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto, folio_nomina) VALUES (:user, :concepto, :folio)";
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
    $query = "SELECT folio FROM nominas ORDER BY id DESC LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastFolio = $row["folio"];
        $folioNumber = intval(substr($lastFolio, 2)) + 1;
    } else {
        $folioNumber = 1;
    }

    // Generar el nuevo folio con el formato 'AC0001'
    $newFolio = 'CN' . str_pad($folioNumber, 5, '0', STR_PAD_LEFT);

    // Insertar el pago en la base de datos con el nuevo folio

    return $newFolio;
}
