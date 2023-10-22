const buscar_contrato = document.getElementById("buscar_contrato");
const datos_contrato = document.getElementById("datos_contrato");
const search_user_Form = document.getElementById("search_user_form");
const btn_pago = document.getElementById("btn_pago");
let contrato, cliente, id_periodo, obs, montoPago;
let newfolio;
let folio_pago;
let mensaje, titulo;

search_user_Form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputBusqueda = document.getElementById('busqueda');
  let busqueda = inputBusqueda.value;
  const url = './php/getCliente.php';
  const data = {
    busqueda: busqueda,
  };
  const params = new URLSearchParams(data);
  const fullURL = `${url}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      var mensaje, titulo;
      if (data != "No_Existe") {
        buscar_contrato.hidden = true;
        let n_contrato = document.getElementById("n_contrato");
        n_contrato.innerHTML = data.idContrato;
        contrato = data.idContrato;
        let n_cliente = document.getElementById("n_cliente");
        n_cliente.innerHTML = data.idCliente;
        cliente = data.idCliente;
        let nombre_usuario = document.getElementById("nombre_usuario");
        nombre_usuario.innerHTML = data.nombre;
        let direccion = document.getElementById("direccion");
        direccion.innerHTML = data.direccion;
        btn_pago.disabled = true;
        // Obtener la fecha y hora actual
        var fechaHoraActual = new Date();

        // Obtener el año actual
        var year = fechaHoraActual.getFullYear().toString().slice(-2);
        var month = fechaHoraActual.getMonth() + 1; // Sumar 1 porque el mes comienza desde 0
        var day = fechaHoraActual.getDate();
        var hour = fechaHoraActual.getHours();
        var minutes = fechaHoraActual.getMinutes();
        var seconds = fechaHoraActual.getSeconds();
        newfolio =
          year +
          (month < 10 ? "0" : "") +
          month +
          (day < 10 ? "0" : "") +
          day +
          (hour < 10 ? "0" : "") +
          hour +
          (minutes < 10 ? "0" : "") +
          minutes +
          (seconds < 10 ? "0" : "") +
          seconds;
        const folio = document.getElementById("folio");
        folio.innerHTML = newfolio;
        mostrarAdeudo(cliente);
        datos_contrato.hidden = false;
        folio_pago = newfolio;
      } else if (data === "No_Existe") {
        titulo = "ERROR EN BUSQUEDA";
        mensaje = "El Contrato o Cliente no existe";
        showCustomAlert(titulo, mensaje);
      } else if (data === "No_Existe_Datos") {
        titulo = "ERROR EN BUSQUEDA";
        mensaje = "No existen datos del cliente";
        showCustomAlert(titulo, mensaje);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

let customAlertButton = document.getElementById("customAlertButton");
customAlertButton.addEventListener("click", function (e) {
  e.preventDefault();
  hideCustomAlert();
});

function showSuccess(titulo, mensaje) {
  var customAlert = document.getElementById("customAlert");
  customAlert.style.display = "block";

  var customAlertTitle = document.getElementById("customAlertTitle");
  customAlertTitle.innerHTML = titulo;

  var customAlertContent = document.getElementById("customAlertContent");
  customAlertContent.innerHTML = mensaje;
}

function showCustomAlert(titulo, mensaje) {
  var customAlert = document.getElementById("customAlert");
  customAlert.style.display = "block";

  var customAlertTitle = document.getElementById("customAlertTitle");
  customAlertTitle.innerHTML = titulo;

  var customAlertContent = document.getElementById("customAlertContent");
  customAlertContent.innerHTML = mensaje;
}

function hideCustomAlert() {
  var customAlert = document.getElementById("customAlert");
  customAlert.style.display = "none";
}

function mostrarAdeudo(nCliente) {
  var radiosContainer = $("#radios-container");
  var montoSeleccionado = $("#total_pago");
  var btnPago = $("#btn_pago");

  // Solicitud AJAX para obtener los periodos adeudados
  $.ajax({
    url: "./php/getPeriodosAdeudados.php?idCliente=" + nCliente,
    dataType: "json",
    success: function (data) {
      console.log(data.idPeriodo)
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var fechaStr = data[i].fecha;
          var fechaObj = new Date(fechaStr);
          var year = fechaObj.getFullYear();
          var month = fechaObj.getMonth() + 1;
          var day = fechaObj.getDate();
          var fechaFormateada =
            year +
            "-" +
            (month < 10 ? "0" : "") +
            month +
            "-" +
            (day < 10 ? "0" : "") +
            day;


          var radioDiv = $("<div>");

          var radio = $("<input>", {
            type: "radio",
            name: "periodo",
            value: data[i].monto,
            id: data[i].idPeriodo,
          });

          var label = $("<label>", {
            for: data[i].idPeriodo,
            text: data[i].nombre_periodo + " - " + fechaFormateada,
          });

          radioDiv.append(radio);
          radioDiv.append(label);

          radiosContainer.append(radioDiv);
        }

        radiosContainer.on("change", 'input[type="radio"]', function () {
          id_periodo = $('input[type="radio"]:checked').attr("id");
          var selectedValue = $('input[type="radio"]:checked').val();
          montoPago = selectedValue;
          var total = parseFloat(selectedValue) || 0.0; // Si no se selecciona ninguno, se establece en 0
          montoSeleccionado.val(total.toFixed(2));
          // Habilitar o deshabilitar el botón según si hay al menos un radio seleccionado
          if ($('input[type="radio"]:checked').length > 0) {
            btnPago.prop("disabled", false);
          } else {
            btnPago.prop("disabled", true);
          }
        });

      } else {
        const mensaje_adeudo = document.getElementById('mensaje_adeudo');
        mensaje_adeudo.innerHTML = "El cliente no adeuda ningún periodo.";
        console.log("El cliente no adeuda ningún periodo.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX: " + status + " - " + error);
    },
  });
}

const payment_user_form = document.getElementById("payment_user_form");
payment_user_form.addEventListener("submit", function (e) {
  const observaciones = document.getElementById("observaciones");
  obs = observaciones.value;
  e.preventDefault();
  const urlPayment = './php/setPago.php';
  const data = {
    contrato: contrato,
    cliente: cliente,
    id_periodo: id_periodo,
    obs: obs,
    montoPago: montoPago
  };

  const params = new URLSearchParams(data);
  const fullURL = `${urlPayment}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      var mensaje, titulo;
      if (data.folio) {
        titulo = "PAGO CORRECTO";
        mensaje = "El pago se ha realizado de manera exitosa.";
        document.location.href = "./result_pay.php?folio_pago=" + data.folio;
      } else if (data === "Error 947") {
        titulo = "ERROR 947";
        mensaje = "Error en primer filtro, consultar con el administrador";
        showCustomAlert(titulo, mensaje);
      } else if (data === "Error 948") {
        titulo = "ERROR 948";
        mensaje = "Error en segundo filtro, consultar con el administrador";
        showCustomAlert(titulo, mensaje);
      } else if (data === "Pagado") {
        titulo = "PERIODO PAGADO";
        mensaje = "El Usuario ya cuenta con ese pago";
        showCustomAlert(titulo, mensaje);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      titulo = "ERROR";
      mensaje = error;
      showCustomAlert(titulo, mensaje);
    });
});
