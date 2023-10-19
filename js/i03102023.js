window.addEventListener('DOMContentLoaded', () => {
  titulo = 'EXITO';
  mensaje = 'No olvides cerrar sesion.';
  showCustomAlert(titulo, mensaje);
  const jsonParameters = localStorage.getItem("parameters");
  const Parameter = JSON.parse(jsonParameters);
  var user = Parameter.usuario;
  let empleadosData = new FormData();
  empleadosData.append("user", user);
  fetch("./php/getEmpleados.php", {
    method: "POST",
    body: empleadosData,
  })
    .then((dat) => dat.json())
    .then((datos) => {
      const nombre = document.getElementById("nombre");
      nombre.innerHTML = datos.nombre;
      const id = document.getElementById("id");
      id.innerHTML = 'Numero de empleado: ' + datos.id;
      const zona = document.getElementById("zona");
      zona.innerHTML = 'Zona: ' + datos.zona;
      const tipo = document.getElementById("tipo");
      tipo.innerHTML = 'Puesto: ' + Parameter.tipo;
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