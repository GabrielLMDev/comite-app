<?php
//Version 2 - STABLE//
try {
    $pdo = new PDO("mysql:host=localhost;dbname=u486552643_ComiteApp", "u486552643_root", "Comite.App2023");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $idCliente = isset($_GET['idCliente']) ? $_GET['idCliente'] : null;

    if ($idCliente !== null) {
        // Obtener los ID de los periodos adeudados
        $sqlGetAdeudados = "SELECT `Periodo1`, `Periodo2`, `Periodo3` 
        FROM clientes_periodo 
        WHERE `idCliente` = :idCliente";
        $stmtGetAdeudados = $pdo->prepare($sqlGetAdeudados);
        $stmtGetAdeudados->bindParam(":idCliente", $idCliente, PDO::PARAM_INT);
        $stmtGetAdeudados->execute();
        $periodosAdeudados = $stmtGetAdeudados->fetch(PDO::FETCH_ASSOC);

        // Filtrar los periodos que tienen valor "PENDIENTE"
        $adeudados = array();
        $datosPrueba = array();
        $contador = 0;

        foreach ($periodosAdeudados as $periodo => $valor) {
            if ($valor === "PENDIENTE") {
                $periodo = str_replace("Periodo", "", $periodo);
                $adeudados[] = $periodo;
            }
        }

        foreach ($adeudados as $idPeriodo) {
            $sqlGetPeriodosData = "SELECT * FROM periodos WHERE idPeriodo = :idPeriodo";
            $stmtGetPeriodosData = $pdo->prepare($sqlGetPeriodosData);
            $stmtGetPeriodosData->bindParam(":idPeriodo", $idPeriodo, PDO::PARAM_INT);
            $stmtGetPeriodosData->execute();
            $periodoData = $stmtGetPeriodosData->fetchAll(PDO::FETCH_ASSOC);

            $datosPrueba = array_merge($datosPrueba, $periodoData);
        }

        // Devolver los datos de los periodos seleccionados en formato JSON
        echo json_encode($datosPrueba);
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
