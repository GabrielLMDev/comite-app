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
    <link href="css/styles_comite_app.css?v=1.2.8" rel="stylesheet">
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
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - REGISTRAR -->
            <li class="nav-item">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-home"></i>
                    <span>Inicio</span></a>
            </li>

            <!-- Heading -->
            <div class="sidebar-heading">
                Pagos
            </div>

            <!-- Nav Item - REGISTRAR -->
            <li class="nav-item">
                <a class="nav-link" href="nuevo_pago.html">
                    <i class="fas fa-fw fa-cash-register"></i>
                    <span>Registrar Pago</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item - BUSCAR -->
            <li class="nav-item" style="margin-top: -15px;">
                <a class="nav-link" href="buscar_pago.html">
                    <i class="fas fa-fw fa-search"></i>
                    <span>Buscar Pago</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item - BUSCAR -->
            <li class="nav-item" style="margin-top: -15px;">
                <a class="nav-link" href="imprimir_historial.html">
                    <i class="fas fa-fw fa-print"></i>
                    <span>Imprimir Historial</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item - PRORROGA -->
            <li class="nav-item" style="margin-top: -15px;">
                <a class="nav-link" href="crear_prorroga.html">
                    <i class="fas fa-fw fa-file-invoice-dollar"></i>
                    <span>Crear Prorroga</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Convenios
            </div>

            <!-- Nav Item - NUEVO CONVENIO -->
            <li class="nav-item">
                <a class="nav-link" href="buttons.html" id="new_convenio">
                    <i class="fas fa-fw fa-handshake"></i>
                    <span>Crear Convenio</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider" id="bar_hidde">

            <li class="nav-item">
                <a class="nav-link" href="#" id="permisos">
                    <i class="fas fa-fw fa-handshake"></i>
                    <span id="text_permissions"></span></a>
            </li>

            <!-- Nav Item - MOSTRAR CONVENIOS -->
            <li class="nav-item" style="margin-top: -15px;">
                <a class="nav-link" href="index.html" id="show_convenio">
                    <i class="fas fa-fw fa-folder-open"></i>
                    <span>Mostrar Convenios</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <div id="hidde_div">
                <div class="sidebar-heading">
                    Movimientos
                </div>

                <!-- Nav Item - NUEVO CONVENIO -->
                <li class="nav-item active">
                    <a class="nav-link" href="movimientos.php" id="new_convenio">
                        <i class="fas fa-fw fa-exchange-alt"></i>
                        <span>Ver Movimientos</span></a>
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
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold" style="color: #ffff;">Movimientos</h6>
                        </div>
                        <div class="card-body" style="text-align: center;">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th>Empleado</th>
                                            <th>Concepto</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Empleado</th>
                                            <th>Concepto</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php
                                        // Conectar a la base de datos (cambia estos valores según tu configuración)
                                        $conexion = new mysqli("localhost", "root", "America.10", "comite-app");

                                        // Verificar la conexión
                                        if ($conexion->connect_error) {
                                            die("Error en la conexión: " . $conexion->connect_error);
                                        }

                                        // Consulta SQL para obtener los datos de la tabla
                                        $query = "SELECT idEmpleado, concepto, fecha FROM empleado_movimientos";
                                        $resultado = $conexion->query($query);

                                        // Verificar si la consulta fue exitosa
                                        if ($resultado) {
                                            // Inicializar un array para almacenar los datos
                                            $datos = array();

                                            // Recorrer el resultado y almacenar los datos en el array
                                            while ($fila = $resultado->fetch_assoc()) {
                                                $datos[] = $fila;
                                            }

                                            // Cerrar la conexión a la base de datos
                                            $conexion->close();
                                        } else {
                                            echo "Error en la consulta: " . $conexion->error;
                                        }
                                        ?>
                                        <?php foreach ($datos as $fila) { ?>
                                            <tr>
                                                <td><?php echo $fila['idEmpleado']; ?></td>
                                                <td><?php echo $fila['concepto']; ?></td>
                                                <td><?php echo $fila['fecha']; ?></td>
                                            </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
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

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="vendor/datatables/jquery.dataTables.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
    <script src="js/table.js"></script>
    <script type="module" src="js/03102023.js?v=1.2.8"></script>

</body>

</html>