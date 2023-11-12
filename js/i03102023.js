window.addEventListener('DOMContentLoaded', () => {
  titulo = 'EXITO';
  mensaje = 'No olvides cerrar sesion.';
  showCustomAlert(titulo, mensaje);

  const cookieParametros = getCookie('parameters');
  const Parameter = JSON.parse(cookieParametros);
  let user = Parameter.usuario;

  const url = './php/getEmpleados.php';
  const data = {
    user: user,
  };
  const params = new URLSearchParams(data);
  const fullURL = `${url}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      const nombre = document.getElementById("nombre");
      nombre.innerHTML = data.nombre;
      const id = document.getElementById("id");
      id.innerHTML = 'Numero de empleado: ' + data.id;
      const zona = document.getElementById("zona");
      zona.innerHTML = 'Zona: ' + data.zona;
      const tipo = document.getElementById("tipo");
      tipo.innerHTML = 'Puesto: ' + Parameter.tipo;
    })
    .catch(error => {
      console.error('Error:', error);
    });

  const nombreCookie = 'userId';
  const valorId = getCookie(nombreCookie);

  if (valorId !== null) {
    const imagen = document.getElementById('perfilImagen');
    const userData = JSON.parse(valorId);
    imagen.src = `./php/avatar_Index.php?id=${userData.id}`;
  } else {
    console.log(`La cookie ${nombreCookie} no existe o no se ha establecido.`);
  }
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}
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
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}