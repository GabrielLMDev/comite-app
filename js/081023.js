const buscar_contrato = document.getElementById('buscar_contrato');
const search_user_Form = document.getElementById('search_user_form');

search_user_Form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputFolio = document.getElementById('folio');
    let folio = inputFolio.value;
    const url = './php/getPago.php';
    const data = {
        folio: folio,
    };
    const params = new URLSearchParams(data);
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
        .then(response => response.json())
        .then(data => {
            let mensaje, titulo;
            if (data != 'No_Existe') {
                buscar_contrato.hidden = true;
                document.location.href = "./result_pay.php?folio_pago=" + data.folio;
            } else if (data === 'No_Existe') {
                titulo = 'ERROR EN BUSQUEDA';
                mensaje = 'El Folio ingresado no existe';
                showCustomAlert(titulo, mensaje);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

let customAlertButton = document.getElementById('customAlertButton');
customAlertButton.addEventListener('click', function (e) {
    e.preventDefault();
    hideCustomAlert();
})

function showSuccess(titulo, mensaje) {
    let customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';

    let customAlertTitle = document.getElementById('customAlertTitle');
    customAlertTitle.innerHTML = titulo;

    let customAlertContent = document.getElementById('customAlertContent');
    customAlertContent.innerHTML = mensaje;
}

function showCustomAlert(titulo, mensaje) {
    let customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';

    let customAlertTitle = document.getElementById('customAlertTitle');
    customAlertTitle.innerHTML = titulo;

    let customAlertContent = document.getElementById('customAlertContent');
    customAlertContent.innerHTML = mensaje;
}

function hideCustomAlert() {
    let customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
    document.location.href = "./buscar_pago.html";
}