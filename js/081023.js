const buscar_contrato = document.getElementById('buscar_contrato');
const search_user_Form = document.getElementById('search_user_form');

search_user_Form.addEventListener('submit', function (e) {
    e.preventDefault();
    var folio = new FormData(search_user_Form);
    fetch('./php/getPago.php', {
        method: 'POST',
        body: folio
    })
        .then(res => res.json())
        .then(data => {
            var mensaje, titulo;
            if (data != 'No_Existe') {
                buscar_contrato.hidden = true;
                document.location.href = "./result_pay.php?folio_pago="+data.folio;
            } else if (data === 'No_Existe') {
                titulo = 'ERROR EN BUSQUEDA';
                mensaje = 'El Folio ingresado no existe';
                showCustomAlert(titulo, mensaje);
            }
        })
});

let customAlertButton = document.getElementById('customAlertButton');
customAlertButton.addEventListener('click', function (e) {
    e.preventDefault();
    hideCustomAlert();
})

function showSuccess(titulo, mensaje) {
    var customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';

    var customAlertTitle = document.getElementById('customAlertTitle');
    customAlertTitle.innerHTML = titulo;

    var customAlertContent = document.getElementById('customAlertContent');
    customAlertContent.innerHTML = mensaje;
}

function showCustomAlert(titulo, mensaje) {
    var customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';

    var customAlertTitle = document.getElementById('customAlertTitle');
    customAlertTitle.innerHTML = titulo;

    var customAlertContent = document.getElementById('customAlertContent');
    customAlertContent.innerHTML = mensaje;
}

function hideCustomAlert() {
    var customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
    document.location.href = "./buscar_pago.html";
}