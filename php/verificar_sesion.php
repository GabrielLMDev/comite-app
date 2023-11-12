<?php
//Version 2 - STABLE//
// Iniciar o reanudar una sesión
session_start();
// Comprobar si una variable de sesión específica existe
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['user_id'] == 'true') {
        echo json_encode(null);
    } else {
        echo json_encode($_SESSION['user_id']);
    }
} else {
    echo json_encode(null);
}
