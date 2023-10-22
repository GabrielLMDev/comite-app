<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=u486552643_ComiteApp", "u486552643_root", "Comite.App2023");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $idCliente = isset($_GET['idCliente']) ? $_GET['idCliente'] : null;

    if ($idCliente !== null) {
        // Obtener los ID de los periodos adeudados
        $sqlGetAdeudados = "SELECT DISTINCT idPeriodo
            FROM periodos
            WHERE idPeriodo NOT IN (
                SELECT DISTINCT idPeriodo
                FROM pagos
                WHERE idCliente = :idCliente
            )";
        $stmtGetAdeudados = $pdo->prepare($sqlGetAdeudados);
        $stmtGetAdeudados->bindParam(":idCliente", $idCliente, PDO::PARAM_INT);
        $stmtGetAdeudados->execute();
        $periodosAdeudados = $stmtGetAdeudados->fetchAll(PDO::FETCH_ASSOC);

        // Obtener los datos de los periodos adeudados
        $periodosData = array();
        foreach ($periodosAdeudados as $periodo) {
            $sqlGetPeriodoData = "SELECT * FROM periodos WHERE idPeriodo = :idPeriodo";
            $stmtGetPeriodoData = $pdo->prepare($sqlGetPeriodoData);
            $stmtGetPeriodoData->bindParam(":idPeriodo", $periodo['idPeriodo'], PDO::PARAM_INT);
            $stmtGetPeriodoData->execute();
            $periodoData = $stmtGetPeriodoData->fetch(PDO::FETCH_ASSOC);
            $periodosData[] = $periodoData;
        }

        echo json_encode($periodosData);
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
