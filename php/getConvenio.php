<?php
//Version 2 - STABLE//
require 'database.php';
$folio = $_GET['folio'];
$folio_datos;
$records = $conn->prepare('SELECT * FROM `convenios` WHERE folio = :folio');
$records->bindParam(':folio', $folio);
$records->execute();
$results = $records->fetch(PDO::FETCH_ASSOC);
if ($results > 0) {
    $folio_datos['idCliente'] = $results['idCliente'];
    $folio_datos['idContrato'] = $results['idContrato'];
    $folio_datos['Cliente'] = $results['Cliente'];
    $folio_datos['Periodos'] = $results['Periodos'];
    $folio_datos['idPeriodo'] = $results['idPeriodo'];
    $folio_datos['Adeudo'] = $results['Adeudo'];
    $folio_datos['Direccion'] = $results['Direccion'];
    $folio_datos['Informacion'] = $results['Informacion'];
    $folio_datos['Convenio'] = $results['Convenio'];
    $folio_datos['Pago_Inicial'] = $results['Pago_Inicial'];
    $folio_datos['Plazo'] = $results['Plazo'];
    $folio_datos['PlazoActual'] = $results['PlazoActual'];
    $folio_datos['Pago'] = $results['Pago'];
    $folio_datos['Restante'] = $results['Restante'];
    $folio_datos['folio'] = $results['folio'];
    $folio_datos['Fecha'] = $results['Fecha'];
    echo json_encode($folio_datos);
} else {
    echo json_encode('No_Existe');
}

