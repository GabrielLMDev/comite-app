<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
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


    $idCliente = '123456';
    $idContrato = '123456';
    $idEmpleado = '186010';
    $fecha_pago = date("Y-m-d");
    $idPeriodo = '1';
    $monto = 100.00;
    $query = "INSERT INTO pagos (idCliente, idContrato, idEmpleado, fecha_pago, idPeriodo, monto, folio) VALUES ('$idCliente', '$idContrato', '$idEmpleado', '$fecha_pago', '$idPeriodo', '$monto', '$newFolio')";
    $conn->query($query);

    // Cerrar la conexión a la base de datos
    $conn->close();

    echo "Pago registrado con folio: " . $newFolio;
    ?>

</body>

</html>