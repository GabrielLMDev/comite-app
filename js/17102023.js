const egresos_payment_form = document.getElementById("egresos_payment_form");


egresos_payment_form.addEventListener("submit", function (e) {
    e.preventDefault();
    let n_User = new FormData(egresos_payment_form);
    fetch("./php/setEgreso.php", {
        method: "POST",
        body: n_User,
    })
        .then((res) => res.json())
        .then((data) => {
            var mensaje, titulo;
            if (data.folio) {
                titulo = "EGRESO REGISTRADO";
                mensaje = "El egreso se ha realizado de manera exitosa con numero de folio: " + data.folio + ".";
                showCustomAlert(titulo, mensaje);
                let concepto = document.getElementById('concepto');
                let beneficiario = document.getElementById('beneficiario');
                let monto = document.getElementById('monto');
                let folio = document.getElementById('folio');
                concepto.value = '';
                beneficiario.value = '';
                monto.value = '';
                folio.value = '';
            } else if (data === "Error 947") {
                titulo = "ERROR 947";
                mensaje = "Error al ingresar egreso.";
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
