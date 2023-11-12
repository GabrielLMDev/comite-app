<?php
if (isset($_GET['folioConvenio'])) {
    // Procesar los datos del formulario aquí
    $dato = $_GET['folioConvenio'];
} else {
    header("HTTP/1.0 404 Not Found");
    header("Location: 404.html");
    // Puedes redirigir al usuario a una página 404 personalizada si lo deseas.
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Comite - Workspace</title>
    <link rel="shortcut icon" href="vendor/assets/LogoNAPA.ico" type="image/x-icon" />
    <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400&display=swap" rel="stylesheet" />
    <link href="css/styles_comite_app.css?v=1.2.0" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>
</head>

<body>

</body>
<script type="module" src="js/pdf_convenio.js?v=1.0.0"></script>

</html>