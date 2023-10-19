window.addEventListener("DOMContentLoaded", () => {
  if (verificarCookie("userId")) {
    document.location.href = "./index.html";
  }
  const passwordInput = document.getElementById('password');
  const mostrarContrasenaCheckbox = document.getElementById('customCheck');
  mostrarContrasenaCheckbox.addEventListener('change', function () {
    if (mostrarContrasenaCheckbox.checked) {

      passwordInput.type = 'text';
    } else {

      passwordInput.type = 'password';
    }
  });
});

// Crear una cookie con tiempo de vida
function setCookie(nombre, valor, dias) {
  var fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  var expiracion = "expires=" + fecha.toUTCString();
  document.cookie = nombre + "=" + valor + "; " + expiracion;
}

function verificarCookie(nombreCookie) {
  var todasLasCookies = document.cookie.split(";");

  for (var i = 0; i < todasLasCookies.length; i++) {
    var cookie = todasLasCookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nombreCookie + "=") === 0) {
      // La cookie existe
      return true;
    }
  }
  // La cookie no existe
  return false;
}

var taskForm = document.getElementById("login_form");
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var inf_login = new FormData(taskForm);
  fetch("./php/getAccess.php", {
    method: "POST",
    body: inf_login,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var mensaje, titulo;
      if (data.estatus === "Ok") {
        localStorage.setItem("parameters", JSON.stringify(data));
        setCookie("userId", data.usuario, 1);
        document.location.href = "./index.html";
      } else if (data === "Error 02") {
        titulo = "ERROR 02";
        mensaje = "Contraseña Incorrecta.";
        showCustomAlert(titulo, mensaje);
      } else if (data === "Error 03") {
        titulo = "ERROR 03";
        mensaje = "No pueden haber campos vacios, verifica.";
        showCustomAlert(titulo, mensaje);
      } else if (data === "Error 01") {
        titulo = "ERROR 01";
        mensaje = "Usuario no registrado.";
        showCustomAlert(titulo, mensaje);
      }
    });
});
let customAlertButton = document.getElementById("customAlertButton");
customAlertButton.addEventListener("click", function (e) {
  e.preventDefault();
  hideCustomAlert();
});
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
