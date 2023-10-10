<?php
session_start();
$nombre = $_GET['userId'];
$_SESSION['user_id'] = $nombre;
echo json_encode('Creado' . $_SESSION['user_id']);
