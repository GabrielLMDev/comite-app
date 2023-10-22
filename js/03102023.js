(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on(
    "mousewheel DOMMouseScroll wheel",
    function (e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    }
  );

  // Scroll to top button appear
  $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  });
  $("#customCheck").change(function () {
    var passwordField = $("#password");
    if ($(this).is(":checked")) {
      passwordField.attr("type", "text");
    } else {
      passwordField.attr("type", "password");
    }
  });
  $("#btn_logout").click(function (e) {
    var nombreCookie = "userId";
    establecerCookieConFechaDeAyer(nombreCookie);
  });
})(jQuery); // End of use strict

function obtenerFechaAyer() {
  var fecha = new Date();
  fecha.setDate(fecha.getDate() - 1);
  return fecha;
}

// Función para establecer una cookie con fecha de vencimiento de ayer
function establecerCookieConFechaDeAyer(nombreCookie) {
  var fechaAyer = obtenerFechaAyer();
  var expiracion = "expires=" + fechaAyer.toUTCString();
  document.cookie = nombreCookie + "=; " + expiracion;
}

window.addEventListener("DOMContentLoaded", () => {
  if (!verificarCookie("userId")) {
    document.location.href = "./login.html";
  }
  const jsonParameters = localStorage.getItem("parameters");
  const Parameter = JSON.parse(jsonParameters);
  var rol_user = Parameter.rol;

  const convenioLink = document.getElementById("new_convenio");
  const admin_div = document.getElementById("admin_div");
  const tesorero_div = document.getElementById("tesorero_div");

  if (rol_user == "A") {

  } else if (rol_user == "B") {
    admin_div.style.display = "none";
    convenioLink.href = "#";
    convenioLink.style.display = "none";
  } else if (rol_user == "C") {
    admin_div.style.display = "none";
    tesorero_div.style.display = "none";
  }

  var user = Parameter.usuario;

  const url = './php/getEmpleados.php';
  const data = {
    user: user,
  };
  const params = new URLSearchParams(data);
  const fullURL = `${url}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      const empleado = document.getElementById("empleado");
      empleado.innerHTML = data.nombre + " - (" + data.id + ")";
      const avatarImg = document.getElementById('avatarImg');
      avatarImg.src = `./php/avatar_Index.php?id=${data.id}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

let btn_logout = document.getElementById("btn_logout");
btn_logout.addEventListener("click", function (e) {
  e.preventDefault();
  const jsonParameters = localStorage.getItem("parameters");
  const Parameter = JSON.parse(jsonParameters);
  const user = Parameter.usuario;

  const url = './php/logout.php';
  const data = {
    user: user,
  };
  const params = new URLSearchParams(data);
  const fullURL = `${url}?${params}`;

  fetch(fullURL)
    .then(response => response.json())
    .then(data => {
      if (data === "Ok") {
        localStorage.removeItem("parameters");
        document.location.href = "./login.html";
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

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
