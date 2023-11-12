const input1 = document.getElementById('pagoActual');
const input2 = document.getElementById('restante');
const resultadoSpan = document.getElementById('resPago');

const buscar_contrato = document.getElementById("buscar_contrato");
const datos_contrato = document.getElementById("datos_contrato");
const search_user_Form = document.getElementById("search_user_form");
const btn_pago = document.getElementById("btn_pago");
let restante, PI, plazo, plazoactual, pagado = 'No';
let mensaje, titulo;
let dataConvenioUpdate = {};

function setURL(folio) {
  const nuevoParametro = "folioConvenio=" + folio;

  // Obtiene la URL actual
  let urlActual = window.location.href;

  // Agrega el parámetro a la URL
  if (urlActual.includes("?")) {
    // Si ya hay parámetros en la URL, agrega el nuevo parámetro con un "&"
    urlActual += `&${nuevoParametro}`;
  } else {
    // Si no hay parámetros en la URL, agrega el nuevo parámetro con un "?"
    urlActual += `?${nuevoParametro}`;
  }

  // Modifica la URL en la barra de direcciones sin recargar la página
  history.pushState(null, "", urlActual);
}

input1.addEventListener('keyup', actualizarResultado);

function actualizarResultado() {
  const valor1 = parseFloat(input1.value) || 0
  const valor2 = parseFloat(restante) || 0;

  const resultado = valor2 - valor1;
  if (plazo == plazoactual) {
    if (resultado < 0 || resultado > 0) {
      btn_pago.disabled = true;
      pagado = 'Si';
    } else {
      btn_pago.disabled = false;
      pagado = 'Si';
    }

  } else {
    if (resultado < 0) {
      btn_pago.disabled = true;
      pagado = 'No';
    } else {
      btn_pago.disabled = false;
      pagado = 'No';
    }
  }
  resultadoSpan.innerHTML = `${resultado}`;
  console.log('Plazo = ' + plazo + ' - PlazoActual = ' + plazoactual + '- Pagado = ' + pagado);
}

search_user_Form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputBusqueda = document.getElementById('busqueda');
  let busqueda = inputBusqueda.value;
  const url = './php/showClienteConvenio.php';
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
        let periodo
        buscar_contrato.hidden = true;
        let n_contrato = document.getElementById("n_contrato").innerHTML = data.idContrato;
        let n_cliente = document.getElementById("n_cliente").innerHTML = data.idCliente;
        let nombre = document.getElementById("nombre_usuario").innerHTML = data.Cliente;
        let direccion = document.getElementById("direccion").innerHTML = data.Direccion;
        document.getElementById("total_adeudo").innerHTML = formatearMoneda(data.Adeudo);
        let adeudo = data.Adeudo;
        if (data.idPeriodo === 10) {
          document.getElementById("periodo").innerHTML = 'Todos los Periodos Adeudados ( ' + data.Periodos + ' )';
          periodo = data.idPeriodo;
        } else {
          document.getElementById("periodo").innerHTML = 'Periodo ' + data.idPeriodo;
          periodo = data.idPeriodo;
        }
        document.getElementById("periodos").innerHTML = data.Periodos;
        let periodos = data.Periodos;
        let informacion = document.getElementById("observaciones").innerHTML = data.Informacion;
        document.getElementById("convenio").innerHTML = formatearMoneda(data.Convenio);
        let convenio = data.Convenio;
        document.getElementById("pago_inicial").innerHTML = formatearMoneda(data.Pago_Inicial);
        PI = data.Pago_Inicial;
        document.getElementById("restante").innerHTML = formatearMoneda(data.Restante);
        let restantePago = data.Restante;
        restante = data.Restante;
        document.getElementById("plazo").innerHTML = data.Plazo + ' Pagos';
        plazo = data.Plazo;
        document.getElementById("plazopago").innerHTML = data.PlazoPago + ' Pago';
        plazoactual = data.PlazoPago;

        dataConvenioUpdate = {
          n_contrato,
          n_cliente,
          nombre,
          direccion,
          adeudo,
          periodo,
          periodos,
          informacion,
          convenio,
          restantePago,
          plazo,
          plazoactual
        };

        btn_pago.disabled = true;
        datos_contrato.hidden = false;
      } else if (data === "No_Existe") {
        titulo = "ERROR EN BUSQUEDA";
        mensaje = "El Contrato o Cliente no existe";
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
  const inputMonto = document.getElementById("pagoActual");
  let monto = inputMonto.value;
  const resPago = document.getElementById("resPago");
  let restanteP = resPago.textContent;
  let pago_inicial = parseInt(PI) + parseInt(monto);
  dataConvenioUpdate.pago_inicial = pago_inicial;
  dataConvenioUpdate.monto = monto;
  dataConvenioUpdate.restanteP = restanteP;
  dataConvenioUpdate.estatus = pagado;

  const urlConvenio = './php/updateConvenio.php';

  const paramConvenio = new URLSearchParams(dataConvenioUpdate);
  const ConvenioURL = `${urlConvenio}?${paramConvenio}`;

  fetch(ConvenioURL)
    .then(response => response.json())
    .then(data => {
      if (data.folio) {
        document.location.href = "./printConvenio.php?folioConvenio=" + data.folio;
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
function formatearMoneda(valor) {
  let moneda = parseFloat(valor);
  return moneda.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });
}