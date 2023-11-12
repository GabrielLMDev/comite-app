<?php
//Version 2 - STABLE//
require 'database.php';
$cliente = $_GET['busqueda'];
$cliente_datos;
$records = $conn->prepare('SELECT * FROM `contratos_cliente` WHERE idContrato = :cliente OR idCliente = :cliente');
$records->bindParam(':cliente', $cliente);
$records->execute();
$results = $records->fetch(PDO::FETCH_ASSOC);
if ($results > 0) {
    $cliente_datos['idContrato'] = $results['idContrato'];
    $cliente_datos['idCliente'] = $results['idCliente'];
    $cliente_datos['direccion'] = $results['direccion'];
    datosCliente($results['idCliente'], $cliente_datos);
} else {
    echo json_encode('No_Existe');
}

function datosCliente($idCliente, $cliente_datos)
{
    require 'database.php';
    $records = $conn->prepare('SELECT * FROM `clientes` WHERE idCliente = :clienteDato');
    $records->bindParam(':clienteDato', $idCliente);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);
    if ($results > 0) {
        $cliente_datos['nombre'] = $results['nombre'];
        getConvenio($idCliente, $cliente_datos);
    } else {
        echo json_encode('No_Existe_Datos');
    }
}

function getConvenio($idCliente, $cliente_datos)
{
    require 'database.php';
    $records = $conn->prepare('SELECT * FROM `convenios` WHERE `idContrato` = :idContrato');
    $records->bindParam(':idContrato', $idCliente);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);
    if ($results > 0) {
        echo json_encode('Convenio_Encontrado');
    } else {
        $cliente_datos['estatus'] = 'Ok';
        echo json_encode($cliente_datos);
    }
}
