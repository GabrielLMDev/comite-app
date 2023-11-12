const input1 = document.getElementById('total_pago');
const input2 = document.getElementById('cuenta');
const resultadoSpan = document.getElementById('restante');
const buscar_contrato = document.getElementById("buscar_contrato");
const datos_contrato = document.getElementById("datos_contrato");
const search_user_Form = document.getElementById("search_user_form");
const btn_pago = document.getElementById("btn_pago");
let contrato, cliente, id_periodo, obs, montoPago, plazoP, nombre, pagado = 'No';
let mensaje, titulo;
let PeriodosArray = [];

input1.addEventListener('keyup', actualizarResultado);
input2.addEventListener('keyup', actualizarResultado);

input2.addEventListener("input", function (event) {
  const valor = event.target.value;
  if (valor.includes("-")) {
    event.target.value = valor.replace("-", ""); // Eliminar el símbolo '-'
  }
});

function actualizarResultado() {
  const valor1 = parseFloat(input1.value) || 0;
  const valor2 = parseFloat(input2.value) || 0;
  const resultado = valor1 - valor2;
  if (plazoP == 1) {
    pagado = 'Si';
    if (resultado < 0 || resultado > 0) {
      btn_pago.disabled = true;
    } else {
      btn_pago.disabled = false;
    }
  } else {
    pagado = 'No';
    if (resultado < 0) {
      btn_pago.disabled = true;
    } else {
      btn_pago.disabled = false;
    }
  }
  resultadoSpan.textContent = `${resultado}`;
}
const plazo = document.getElementById('plazo');

plazo.addEventListener("change", function () {
  plazoP = plazo.value;
});

search_user_Form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputBusqueda = document.getElementById('busqueda');
  let busqueda = inputBusqueda.value;
  const url = './php/getClienteConvenio.php';
  const data = {
    busqueda: busqueda,
  };
  const params = new URLSearchParams(data);
  const fullURL = `${url}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      var mensaje, titulo;
      if (data.estatus === "Ok") {
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
        mostrarAdeudo(cliente);
        datos_contrato.hidden = false;
      } else if (data === "No_Existe") {
        titulo = "ERROR EN BUSQUEDA";
        mensaje = "El Contrato o Cliente no existe";
        showCustomAlert(titulo, mensaje);
      } else if (data === "No_Existe_Datos") {
        titulo = "ERROR EN BUSQUEDA";
        mensaje = "No existen datos del cliente";
        showCustomAlert(titulo, mensaje);
      } else if (data === 'Convenio_Encontrado') {
        titulo = "Error: Convenio Encontrado";
        mensaje = "El cliente ya cuenta con un convenio";
        showCustomAlert(titulo, mensaje);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const convenioForm = document.getElementById("convenioForm");
convenioForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const observaciones = document.getElementById("observaciones");
  obs = observaciones.value;
  const nombre_usuario = document.getElementById("nombre_usuario");
  nombre = nombre_usuario.textContent;
  const inputtotal_pago = document.getElementById("total_pago");
  let Pago = inputtotal_pago.value;
  const total_adeudo = document.getElementById("total_adeudo");
  let adeudo = total_adeudo.textContent;
  const direccion = document.getElementById("direccion");
  let direccionC = direccion.textContent;
  const cuenta = document.getElementById("cuenta");
  let cuentaInput = cuenta.value;
  const restante = document.getElementById("restante");
  let restanteInput = restante.textContent;

  const urlConvenio = './php/setConvenio.php';
  const dataConvenio = {
    contrato: contrato,
    cliente: cliente,
    nombre: nombre,
    periodos: PeriodosArray,
    idPeriodo: id_periodo,
    adeudo: adeudo,
    direccion: direccionC,
    informacion: obs,
    convenio: Pago,
    plazo: plazoP,
    Pago_Inicial: cuentaInput,
    restante: restanteInput,
    estatus: pagado
  };

  const paramConvenio = new URLSearchParams(dataConvenio);
  const ConvenioURL = `${urlConvenio}?${paramConvenio}`;

  fetch(ConvenioURL)
    .then(response => response.json())
    .then(data => {
      if (data.folio) {
        document.location.href = "./printContrato.php?folioConvenio=" + data.folio;
      } else if (data === 'Error 948') {
        titulo = "ERROR 948";
        mensaje = error;
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
  var adeudo = $("#total_adeudo");
  var btnPago = $("#btn_pago");
  let radioDiv, radio, label;
  let sumaTotalMonto = 0;

  // Solicitud AJAX para obtener los periodos adeudados
  $.ajax({
    url: "./php/getPeriodosAdeudados.php?idCliente=" + nCliente,
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          sumaTotalMonto += data[i].monto;
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

          PeriodosArray[i] = data[i].idPeriodo;
          radioDiv = $("<div>");

          radio = $("<input>", {
            type: "radio",
            name: "periodo",
            value: data[i].monto,
            id: data[i].idPeriodo,
          });

          label = $("<label>", {
            for: data[i].idPeriodo,
            text: data[i].nombre_periodo + " - " + fechaFormateada,
          });

          radioDiv.append(radio);
          radioDiv.append(label);

          radiosContainer.append(radioDiv);
        }

        /*SELECCIONAR TODOS LOS PERIODOS*/
        radioDiv = $("<div>");

        radio = $("<input>", {
          type: "radio",
          name: "periodo",
          value: sumaTotalMonto,
          id: 10,
        });

        label = $("<label>", {
          for: 10,
          text: "PAGAR TODOS"
        });

        radioDiv.append(radio);
        radioDiv.append(label);

        radiosContainer.append(radioDiv);

        radiosContainer.on("change", 'input[type="radio"]', function () {
          id_periodo = $('input[type="radio"]:checked').attr("id");
          var selectedValue = $('input[type="radio"]:checked').val();
          montoPago = selectedValue;
          var total = parseFloat(selectedValue) || 0.0; // Si no se selecciona ninguno, se establece en 0
          montoSeleccionado.val(total.toFixed(2));
          adeudo.text(total.toFixed(2));
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