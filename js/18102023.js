window.addEventListener("DOMContentLoaded", () => {
    const pago = document.getElementById('pago');
    let option = document.createElement("option");
    option.value = '';
    option.text = "Selecciona";
    pago.appendChild(option);
    let efectivo = document.createElement("option");
    efectivo.value = '0';
    efectivo.text = "Efectivo";
    pago.appendChild(efectivo);
    let bancario = document.createElement("option");
    bancario.value = '1';
    bancario.text = "Deposito";
    pago.appendChild(bancario);

});

const salarios_payment_form = document.getElementById("salarios_payment_form");
salarios_payment_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputEmpleado = document.getElementById("nEmpleado");
    const inputPuesto = document.getElementById("puesto");
    const inputPago = document.getElementById("n_pago");
    const inputBase = document.getElementById("sBase");
    const inputBonificacion = document.getElementById("sBonificacion");
    const inputDeduccion = document.getElementById("sDeduccion");
    const selectPago = document.getElementById("pago");
    const selectNombre = document.getElementById("resultado");

    const nEmpleado = inputEmpleado.value;
    const puesto = inputPuesto.value;
    const n_pago = inputPago.value;
    const sBase = inputBase.value;
    const sBonificacion = inputBonificacion.value;
    const sDeduccion = inputDeduccion.value;
    const pago = selectPago.options[selectPago.selectedIndex].value;
    const nombre = selectNombre.options[selectNombre.selectedIndex].text;

    const url = './php/setNomina.php';
    const data = {
        nEmpleado: nEmpleado,
        puesto: puesto,
        n_pago: n_pago,
        pago: pago,
        sBase: sBase,
        sBonificacion: sBonificacion,
        sDeduccion: sDeduccion,
        nombreEmpleado: nombre
    };
    const params = new URLSearchParams(data);
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
        .then(response => response.json())
        .then(data => {
            var mensaje, titulo;
            if (data.folio) {
                titulo = "SALARIO REGISTRADO";
                mensaje = "El salario se ha realizado de manera exitosa con numero de folio: " + data.folio + ".";
                showCustomAlert(titulo, mensaje);
                document.getElementById("nEmpleado").value = "";
                document.getElementById("puesto").value = "";
                document.getElementById("n_pago").value = "";
                document.getElementById("sBase").value = "";
                document.getElementById("sBonificacion").value = "";
                document.getElementById("sDeduccion").value = "";
            } else if (data === "Error 947") {
                titulo = "ERROR 947";
                mensaje = "Error al ingresar salario.";
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
    const pago = document.getElementById('pago');
    let selectedOption = pago.options[pago.selectedIndex];

    if (selectedOption.value > 0) {
        const n_pago = document.getElementById('n_pago');
        n_pago.value = '';
    } else if (selectedOption === '') {
        n_pago.value = 'S/N';
    } else {
        n_pago.value = 'S/N';
    }
}