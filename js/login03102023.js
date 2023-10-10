window.addEventListener('DOMContentLoaded', () => {
    var valor = null;
    const jsonParameters = localStorage.getItem('parameters');
    const Parameter = JSON.parse(jsonParameters);
    valor = Parameter.estatus;
    console.log(Parameter.estatus);
    if (valor != null) {
        document.location.href = "./index.html";
    }
});

var taskForm = document.getElementById('login_form');
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var inf_login = new FormData(taskForm);
    fetch('./php/getAccess.php', {
        method: 'POST',
        body: inf_login
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var mensaje, titulo;
            if (data.estatus === 'Ok') {
                localStorage.setItem('parameters', JSON.stringify(data));
                document.cookie = "userId=" + data.usuario;
                document.location.href = "./index.html";
            } else if (data === 'Error 02') {
                titulo = 'ERROR 02';
                mensaje = 'Contraseña Incorrecta.';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'Error 03') {
                titulo = 'ERROR 03';
                mensaje = 'No pueden haber campos vacios, verifica.';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'Error 01') {
                titulo = 'ERROR 01';
                mensaje = 'Usuario no registrado.';
                showCustomAlert(titulo, mensaje);
            }
        })
});
let customAlertButton = document.getElementById('customAlertButton');
customAlertButton.addEventListener('click', function (e) {
    e.preventDefault();
    hideCustomAlert();
})
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
}
