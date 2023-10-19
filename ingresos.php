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
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400&display=swap" rel="stylesheet" />
  <link href="css/styles_comite_app.css?v=1.2.8" rel="stylesheet" />
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
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-hand-holding-usd"></i>
            <span>Egresos</span>
          </a>
          <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
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

        <li class="nav-item active" style="margin-top: -15px">
          <a class="nav-link" href="ingresos.php" id="new_convenio">
            <i class="fas fa-fw fa-dollar"></i>
            <span>Ver Ingresos</span></a>
        </li>
        <!-- Divider -->
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
          <h1 class="h3 mb-0 text-black" style="font-size: medium">
            COMITE ADMINISTRATIVO DEL SISTEMA DE AGUA POTABLE DE AYOTLA EDO.
            DE MEX. A.C
          </h1>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="empleado">Usuario</span>
                <img class="img-profile rounded-circle" src="img/undraw_profile.svg" />
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
          <div class="card shadow mb-4" style="padding-bottom: 30px">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold" style="color: #ffff">
                Ingresos
              </h6>
            </div>
            <div class="card-body">
              <?php
              $conn = new mysqli("localhost", "root", "America.10", "comite-app");
              if ($conn->connect_error) {
                die("Error de conexión a
                la base de datos: " . $conn->connect_error);
              }
              $query = "SELECT
                SUM(monto) AS total_de_importes FROM pagos";
              $result =
                $conn->query($query);
              if ($result) {
                $row =
                  $result->fetch_assoc();
                $totalImportes =
                  $row['total_de_importes'];
                echo "Entradas totales de 2023: $" .
                  $totalImportes;
              } else {
                echo "Error al ejecutar la consulta: "
                  . $conn->error;
              }
              $conn->close(); ?>
            </div>
            <div id="datos_consulta">
              <form id="search_user_form" style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  ">
                <div style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    ">
                  <label for="inicio" style="width: 300px">Fecha de Inicio</label>
                  <input type="date" name="inicio" id="inicio" style="margin: 5px" class="form-control" required />
                  <label for="inicio" style="width: 50px; margin-left: 10px">a</label>
                  <input type="date" name="final" id="final" style="margin: 5px" class="form-control" required />
                </div>
                <input type="submit" class="btn btn-primary btn-lg" style="width: 200px; margin-top: 10px" value="Buscar Ingresos" />
              </form>
            </div>
            <div id="tabla_hidde" hidden>
              <div class="card-body" style="text-align: center">
                <div class="table-responsive">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="text-align: center">
                    <thead>
                      <tr>
                        <th>ID Empleado</th>
                        <th>Total de Pagos</th>
                      </tr>
                    </thead>
                    <tbody></tbody>

                    <tfoot>
                      <tr>
                        <th>ID Empleado</th>
                        <th>Total de Pagos</th>
                      </tr>
                    </tfoot>
                    <tbody></tbody>
                  </table>
                  <div class="card-body">
                    <span id="entradas"></span>
                  </div>
                </div>
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
            <span>Copyright &copy; Comite-App 2023 desarrollado por
              <a href="https://gabriellmdev.com/" target="_blank">Ing. Jesús Gabriel Luengas Méndez</a></span>
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
          <h5 class="modal-title" id="exampleModalLabel">
            ¿Seguro que quiere terminar la sesión?
          </h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Da click en el boton "Cerrar Sesión".</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Cancelar
          </button>
          <button class="btn btn-primary" type="button" id="btn_logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>

  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="vendor/datatables/jquery.dataTables.js"></script>
  <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
  <script type="module" src="js/03102023.js?v=1.2.9"></script>
  <script type="module" src="js/14102023.js?v=1.1.5"></script>
</body>

</html>