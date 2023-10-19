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
    let datos = new FormData(salarios_payment_form);
    fetch("./php/setNomina.php", {
        method: "POST",
        body: datos,
    })
        .then((res) => res.json())
        .then((data) => {
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
        n_pago.value = 'Null';
    } else {
        n_pago.value = 'Null';
    }
}