<?php
require 'database.php';
$folio = $_POST['folio'];
$folio_datos;
$records = $conn->prepare('SELECT * FROM `pagos` WHERE folio = :folio');
$records->bindParam(':folio', $folio);
$records->execute();
$results = $records->fetch(PDO::FETCH_ASSOC);
if ($results > 0) {
    $folio_datos['idCliente'] = $results['idCliente'];
    $folio_datos['idContrato'] = $results['idContrato'];
    $folio_datos['idEmpleado'] = $results['idEmpleado'];
    $folio_datos['fecha_pago'] = $results['fecha_pago'];
    $folio_datos['idPeriodo'] = $results['idPeriodo'];
    $folio_datos['observaciones'] = $results['observaciones'];
    $folio_datos['monto'] = $results['monto'];
    $folio_datos['folio'] = $results['folio'];
    echo json_encode($folio_datos);
}else{
    echo json_encode('No_Existe');
}
