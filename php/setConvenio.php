<?php
//Version 2 - STABLE//
require 'database.php';

/*PARAMETROS URL*/
$idContrato = $_GET['contrato'];
$idCliente = $_GET['cliente'];
$nombreCliente = $_GET['nombre'];
$periodos = $_GET['periodos'];
$idPeriodo = $_GET['idPeriodo'];
$Adeudo = $_GET['adeudo'];
$Direccion = $_GET['direccion'];
$Informacion = $_GET['informacion'];
$Convenio = $_GET['convenio'];
$Pago_Inicial = $_GET['Pago_Inicial'];
$Plazo = $_GET['plazo'];
$PlazoActual = 1;
$Restante = $_GET['restante'];
$Estatus = $_GET['estatus'];

/*COOKIE ID EMPLEADO*/
$cookie_name = "userId";
$cookie_value = json_decode($_COOKIE[$cookie_name], true);
$idEmpleado = $cookie_value['id'];
$nombreEmpleado = $cookie_value['nombre'];

$folio = crear_folio();
$pasar_folio;


$sql = "INSERT INTO convenios (idContrato, idCliente, Cliente, Periodos, idPeriodo, Adeudo, Direccion, Informacion, Convenio, Pago_Inicial, Plazo, PlazoActual, Pago, Restante, idEmpleado, folio) 
VALUES (:idContrato, :idCliente, :Cliente, :Periodos, :idPeriodo, :Adeudo, :Direccion, :Informacion, :Convenio, :Pago_Inicial, :Plazo, :PlazoActual, :Pago, :Restante, :idEmpleado, :Folio)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':idContrato', $idContrato);
$stmt->bindParam(':idCliente', $idCliente);
$stmt->bindParam(':Cliente', $nombreCliente);
$stmt->bindParam(':Periodos', $periodos);
$stmt->bindParam(':idPeriodo', $idPeriodo);
$stmt->bindParam(':Adeudo', $Adeudo);
$stmt->bindParam(':Direccion', $Direccion);
$stmt->bindParam(':Informacion', $Informacion);
$stmt->bindParam(':Convenio', $Convenio);
$stmt->bindParam(':Pago_Inicial', $Pago_Inicial);
$stmt->bindParam(':Plazo', $Plazo);
$stmt->bindParam(':PlazoActual', $PlazoActual);
$stmt->bindParam(':Pago', $Pago_Inicial);
$stmt->bindParam(':Restante', $Restante);
$stmt->bindParam(':idEmpleado', $idEmpleado);
$stmt->bindParam(':Folio', $folio);

if ($stmt->execute()) {

    $sql = "INSERT INTO pagos (idCliente, idContrato, idEmpleado, idPeriodo, observaciones, monto, folio_convenio) VALUES (:idCliente, :idContrato, :idEmpleado, :idPeriodo, :observaciones, :monto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idCliente', $idCliente);
    $stmt->bindParam(':idContrato', $idContrato);
    $stmt->bindParam(':idEmpleado', $idEmpleado);
    $stmt->bindParam(':idPeriodo', $idPeriodo);
    $stmt->bindParam(':observaciones', $Informacion);
    $stmt->bindParam(':monto', $Pago_Inicial);
    $stmt->bindParam(':folio', $folio);

    if ($stmt->execute()) {
        SetMov($folio, $Pago_Inicial, $idCliente, $idEmpleado, $nombreEmpleado, $Estatus, $idPeriodo);
    } else {
        echo json_encode('Error 947');
    }
} else {
    echo json_encode('Error 947');
}

function setMov($folio, $Monto, $idCliente, $idEmpleado, $nombre, $Estatus, $idPeriodo)
{
    require 'database.php';
    $concept = "PAGO DE CONVENIO POR $" . $Monto . " DE CLIENTE " . $idCliente;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, nombre, concepto, folio_convenio) VALUES (:user, :nombre, :concepto, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $idEmpleado);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':concepto', $concept);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        $pasar_folio['folio'] = $folio;
        if ($Estatus == 'Si') {
            require 'database.php';
            $sql = "UPDATE `convenios` SET `idContrato`= NULL WHERE idContrato = :idContrato";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idContrato', $idCliente);
            if ($stmt->execute()) {
                if ($idPeriodo == 10) {
                    actualizarPeriodos($idCliente, $folio);
                } else {
                    actualizarPeriodo($idCliente, $folio, $idPeriodo);
                }
            } else {
                echo json_encode('Error 511');
            }
        } else {
            setContrato($idCliente, $folio, $pasar_folio);
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
    $query = "SELECT folio_convenio FROM pagos WHERE folio_convenio != 'NULL' ORDER BY idPago DESC LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastFolio = $row["folio_convenio"];
        $folioNumber = intval(substr($lastFolio, 2)) + 1;
    } else {
        $folioNumber = 1;
    }

    // Generar el nuevo folio con el formato 'AC0001'
    $newFolio = 'CP' . str_pad($folioNumber, 5, '0', STR_PAD_LEFT);

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
function setContrato($idCliente, $folio, $pasar_folio)
{
    require 'database.php';
    $sql = "INSERT INTO contratosconvenios (idCliente, folio) VALUES (:idCliente, :folio)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idCliente', $idCliente);
    $stmt->bindParam(':folio', $folio);
    if ($stmt->execute()) {
        echo json_encode($pasar_folio);
    }
}
