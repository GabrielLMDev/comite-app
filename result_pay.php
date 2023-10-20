<?php
if (isset($_GET['folio_pago'])) {
    // Procesar los datos del formulario aquí
    $dato = $_GET['folio_pago'];
} else {
    header("HTTP/1.0 404 Not Found");
    header("Location: 404.html");
    // Puedes redirigir al usuario a una página 404 personalizada si lo deseas.
    // header("Location: pagina404.html");
    exit;
}
?>
<?php
require 'php/database.php';
$folio_datos;
$records = $conn->prepare('SELECT * FROM `pagos` WHERE folio = :folio');
$records->bindParam(':folio', $dato);
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

    $nombreCookie = "cliente";
    $valorCookie = $results['idCliente'];

    // Define la caducidad de la cookie (por ejemplo, 1 día)
    $tiempoCaducidad = time() + 60 * 60 * 24; // 24 horas

    // Crea la cookie utilizando setcookie()
    setcookie($nombreCookie, $valorCookie, $tiempoCaducidad, "/");
    setMov($folio_datos['folio']);
} else {
    header("Location: 404.html");
}

function setMov($folio_datos)
{
    require 'php/database.php';
    $concept = 'CONSULTA DE PAGO CON NUMERO DE FOLIO ' . $folio_datos;
    $sql = "INSERT INTO empleado_movimientos (idEmpleado, concepto) VALUES (:user, :concepto)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $_COOKIE['userId']);
    $stmt->bindParam(':concepto', $concept);
    if ($stmt->execute()) {
    } else {
        echo ('Error');
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Comite - Workspace</title>
    <link rel="shortcut icon" href="vendor/assets/LogoNAPA.ico" type="image/x-icon">
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400&display=swap" rel="stylesheet">
    <link href="css/styles_comite_app.css?v=1.2.9" rel="stylesheet">
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>


</head>

<body id="page-top">

    <!-- VENTANA -->
    <div id="wrapper">

        <!-- BARRA MENU -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <!-- LOGO - MENU -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-faucet"></i>
                </div>
                <div class="sidebar-brand-text mx-3">COMITE DE AYOTLA</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - REGISTRAR -->
            <li class="nav-item">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-home"></i>
                    <span>Inicio</span></a>
            </li>

            <hr class="sidebar-divider" />

            <!-- Heading -->
            <div class="sidebar-heading">Secretario</div>

            <!-- Menu pagos -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-search-dollar"></i>
                    <span>Pagos y Consultas</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="nuevo_pago.html">Registrar Pago</a>
                        <a class="collapse-item" href="buscar_pago.html">Buscar Pago</a>
                        <a class="collapse-item" href="imprimir_historial.html">
                            <span>Imprimir Historial</span></a>
                    </div>
                </div>
            </li>
            <hr class="sidebar-divider" />

            <div id="tesorero_div">
                <!-- Heading -->
                <div class="sidebar-heading">Tesorero</div>
                <!-- Menu Egresos -->
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-hand-holding-usd"></i>
                        <span>Egresos</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="registrar_egreso.html">Registrar Egreso</a>
                            <a class="collapse-item" href="registrar_nomina.html">Pago Nómina</a>
                            <a class="collapse-item" href="aportaciones.html">Aportaciones</a>
                        </div>
                    </div>
                </li>
                <hr class="sidebar-divider" />
            </div>

            <div id="admin_div">
                <div class="sidebar-heading">Administrador</div>
                <li class="nav-item">
                    <a class="nav-link" href="movimientos.php" id="new_convenio">
                        <i class="fas fa-fw fa-exchange-alt"></i>
                        <span>Ver Movimientos</span></a>
                </li>

                <hr class="sidebar-divider" />

                <li class="nav-item" style="margin-top: -14px;">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="#collapsePages">
                        <i class="fas fa-hand-holding-usd"></i>
                        <span>Ver Entradas y Salidas</span>
                    </a>
                    <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="ingresos.html" id="new_convenio">Ver Ingresos</a>
                            <a class="collapse-item" href="egresos.html" id="new_convenio">Ver Egresos</a>
                            <a class="collapse-item" href="nominas_pagadas.html">Ver Nominas Pagadas</a>
                        </div>
                    </div>
                </li>

                <hr class="sidebar-divider" />

                <!-- Nav Item - PRORROGA -->
                <li class="nav-item" style="margin-top: -15px">
                    <a class="nav-link" href="crear_convenio.html">
                        <i class="fas fa-fw fa-file-invoice-dollar"></i>
                        <span>Crear Convenio</span></a>
                </li>
            </div>
        </ul>
        <!-- FIN BARRA MENU -->

        <!-- CONTENIDO -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- CONTENIDO PRINCIPAL -->
            <div id="content">

                <!-- TOPBAR -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Titulo -->
                    <h1 class="h3 mb-0 text-black" style="font-size: medium;">COMITE ADMINISTRATIVO DEL SISTEMA DE AGUA
                        POTABLE DE AYOTLA EDO. DE MEX. A.C</h1>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="empleado">Usuario</span>
                                <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar Sesión
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <!-- FIN TOPBAR -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <div class="card shadow mb-4" id="info_pago">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold" style="color: #ffff;">INFORMACIÓN DE PAGO</h6>
                        </div>
                        <div class="card-body row">
                            <!-- CARD CONTRATO -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-bottom-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-0">
                                                    NUMERO DE CONTRATO</div>
                                                <div class="h5 mb-2 font-weight-bold text-gray-800">
                                                    <span id="n_contrato"><?php echo $folio_datos['idContrato'] ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-house-user fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD CLIENTE -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-bottom-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-0">
                                                    NUMERO DE CLIENTE</div>
                                                <div class="h5 mb-2 font-weight-bold text-gray-800">
                                                    <span id="n_cliente"><?php echo $folio_datos['idCliente'] ?></script>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-user fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD PERIODO -->
                            <div class="col-xl-3 col-md-6 mb-4" style="width: 300px;">
                                <div class="card border-bottom-primary shadow h-100 py-2" style="width: auto;">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    PERIODO</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                    <span id="periodo"><?php echo $folio_datos['idPeriodo'] ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-clock fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD FECHA -->
                            <div class="col-xl-3 col-md-6 mb-4" style="width: 300px;">
                                <div class="card border-bottom-primary shadow h-100 py-2" style="width: auto;">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    FECHA</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                    <span id="fecha_pago"><?php echo $folio_datos['fecha_pago'] ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar-day fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD OBSERVACIONES -->
                            <div class="col-xl-3 col-md-6 mb-4" style="width: 300px;">
                                <div class="card border-bottom-primary shadow h-100 py-2" style="width: auto;">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    OBSERVACIONES</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                    <span id="observaciones"><?php echo $folio_datos['observaciones'] ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-eye fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD TOTAL -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-bottom-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Monto</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                    <span id="total_pago"><?php echo '$' . $folio_datos['monto'] . '.00 MXN' ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CARD FOLIO -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-bottom-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    FOLIO</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                    <span id="folio"><?php echo $folio_datos['folio'] ?>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-sticky-note fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body" style="display: flex; justify-content: center; align-items: center;">
                                <!-- Imagen -->
                                <div class="card shadow mb-4" style="height: 94%;">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 20rem;" src="vendor/assets/Tortuga_Comite.png" alt="...">
                                        </div>
                                    </div>
                                </div>

                                <!-- Grafico -->
                                <div class="col-xl-4 col-lg-5">
                                    <div class="card shadow mb-4">
                                        <!-- Card Body -->
                                        <div class="card-body">
                                            <div class="chart-pie pt-4 pb-2">
                                                <canvas id="myPieChart"></canvas>
                                            </div>
                                            <div class="mt-4 text-center small">
                                                <span class="mr-2">
                                                    <i class="fas fa-circle text-warning"></i> Periodos Pagados: <span id="pp"></span>
                                                </span>
                                                <span class="mr-2">
                                                    <i class="fas fa-circle text-danger"></i> Por Pagar: <span id="ppp"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body" style="display: flex; justify-content: center; align-items: center;">
                                <img src="vendor/assets/Banner.png" alt="" style="width: 80%;">
                                <div id="qr-code"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- FIN CONTENIDO PRINCIPAL -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Comite-App 2023 desarrollado por <a href="https://gabriellmdev.com/" target="_blank">Ing. Jesús Gabriel Luengas Méndez</a></span>
                    </div>
                </div>
            </footer>
            <!-- Fin Footer -->

        </div>
        <!-- FIN CONTENIDO -->

    </div>
    <!-- FIN VENTANA -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">¿Seguro que quiere terminar la sesión?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Da click en el boton "Cerrar Sesión".</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                    <button class="btn btn-primary" type="button" id="btn_logout">Cerrar sesión</button>
                </div>
            </div>
        </div>
    </div>

    <div id="customAlert" class="custom-alert">
        <div id="customAlertTitle" class="custom-alert-content"></div>
        <div id="customAlertContent" class="custom-alert-content"></div>
        <button id="customAlertButton" class="custom-alert-button">Aceptar</button>
    </div>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="vendor/chart.js/Chart.min.js"></script>
    <script src="js/demo/chart-pie-demo.js?v=1.0.8"></script>
    <script type="module" src="js/03102023.js?v=1.3.8"></script>
    <script type="module" src="js/qr.js?v=1.0.2"></script>

</body>

</html>