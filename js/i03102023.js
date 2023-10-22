window.addEventListener('DOMContentLoaded', () => {
  titulo = 'EXITO';
  mensaje = 'No olvides cerrar sesion.';
  showCustomAlert(titulo, mensaje);
  const jsonParameters = localStorage.getItem("parameters");
  const Parameter = JSON.parse(jsonParameters);
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
    imagen.src = `./php/avatar_Index.php?id=${valorId}`;
  } else {
    console.log(`La cookie ${nombreCookie} no existe o no se ha establecido.`);
  }
});
function getCookie(nombreCookie) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === nombreCookie) {
      return cookie[1];
    }
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