window.addEventListener('DOMContentLoaded', () => {
  titulo = 'EXITO';
  mensaje = 'No olvides cerrar sesion.';
  showCustomAlert(titulo, mensaje);
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