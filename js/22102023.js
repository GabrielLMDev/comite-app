window.addEventListener("DOMContentLoaded", () => {
    const pago = document.getElementById('tipo');
    let option = document.createElement("option");
    option.value = '';
    option.text = "Selecciona";
    pago.appendChild(option);
    let efectivo = document.createElement("option");
    efectivo.value = 'Monetaria';
    efectivo.text = "Aportacion Monetaria";
    pago.appendChild(efectivo);
    let especie = document.createElement("option");
    especie.value = 'Especie';
    especie.text = "Aportacion en Especie";
    pago.appendChild(especie);
    let recurrente = document.createElement("option");
    recurrente.value = 'Recurrente';
    recurrente.text = "Aportacion recurrente";
    pago.appendChild(recurrente);


    const mPago = document.getElementById('mPago');
    let defaultOpcion = document.createElement("option");

    defaultOpcion.value = '';
    defaultOpcion.text = "Selecciona";
    mPago.appendChild(defaultOpcion);

    let efect = document.createElement("option");
    efect.value = '0';
    efect.text = "Efectivo";
    mPago.appendChild(efect);

    let bancario = document.createElement("option");
    bancario.value = '1';
    bancario.text = "Deposito";
    mPago.appendChild(bancario);


});

const egresos_payment_form = document.getElementById("egresos_payment_form");
egresos_payment_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputDonante = document.getElementById('donante');
    const inputBeneficiario = document.getElementById('beneficiario');
    const inputMonto = document.getElementById('monto');
    const inputTipo = document.getElementById('tipo');
    let tipoOption = inputTipo.options[inputTipo.selectedIndex];
    const inputPago = document.getElementById('mPago');
    let pagoOption = inputPago.options[inputPago.selectedIndex];
    const inputFolio = document.getElementById('folio');
    const inputConcepto = document.getElementById('concepto');

    const donante = inputDonante.value;
    const beneficiario = inputBeneficiario.value;
    const monto = inputMonto.value;
    const tipo = tipoOption.value;
    const metodo = pagoOption.value;
    const folio = inputFolio.value;
    const concepto = inputConcepto.value;

    const url = './php/setAportacion.php';
    const data = {
        donante: donante,
        beneficiario: beneficiario,
        monto: monto,
        tipo: tipo,
        metodo: metodo,
        folio: folio,
        concepto: concepto,
    };

    const params = new URLSearchParams(data);
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
        .then(response => response.json())
        .then(data => {
            var mensaje, titulo;
            if (data.folio) {
                titulo = "APORTACIÓN REGISTRADA";
                mensaje = "La aportación se ha realizado de manera exitosa con numero de folio: " + data.folio + ".";
                showCustomAlert(titulo, mensaje);
                inputDonante.value = '';
                inputBeneficiario.value = '';
                inputMonto.value = '';
                tipoOption.value = '';
                pagoOption.value = '';
                inputFolio.value = '';
                inputConcepto.value = '';
            } else if (data === "Error 947") {
                titulo = "ERROR 947";
                mensaje = "Error al ingresar egreso.";
                showCustomAlert(titulo, mensaje);
            } else if (data === "Error 948") {
                titulo = "ERROR 948";
                mensaje = "Error al ingresar el movimiento.";
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
function formaPago() {
    const pago = document.getElementById('mPago');
    let selectedOption = pago.options[pago.selectedIndex];
    const n_pago = document.getElementById('folio');
    if (selectedOption.value > 0) {
        n_pago.value = '';
    } else if (selectedOption === '') {
        n_pago.value = 'S/N';
    } else {
        n_pago.value = 'S/N';
    }
}