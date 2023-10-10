(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });
  $('#customCheck').change(function () {
    var passwordField = $('#password');
    if ($(this).is(':checked')) {
      passwordField.attr('type', 'text');
    } else {
      passwordField.attr('type', 'password');
    }
  });
})(jQuery); // End of use strict

window.addEventListener('DOMContentLoaded', () => {

  var empleadoId = getCookie("userId");

  var xhr = new XMLHttpRequest();
  xhr.open('GET', './php/setCookie.php?userId=' + empleadoId, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

      // Parsea la respuesta JSON y crea las opciones del select
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    }
  };

  xhr.send();

  var valor;
  const jsonParameters = localStorage.getItem('parameters');
  if (jsonParameters == null) {
    valor = null;
  } else {
    const Parameter = JSON.parse(jsonParameters);
    valor = Parameter.estatus;
  }
  if (valor == null) {
    document.location.href = "./login.html";
  }

  const Parameter = JSON.parse(jsonParameters);
  var tipo_user = Parameter.tipo;

  const convenioLink = document.getElementById('new_convenio');
  const convenioShow = document.getElementById('show_convenio');
  const texto = document.getElementById('text_permissions');
  const bar_hidde = document.getElementById('bar_hidde');
  const permisos = document.getElementById('permisos');
  const hidde_div = document.getElementById('hidde_div');
  if (tipo_user != "admin") {
    hidde_div.style.display = 'none';
    convenioLink.href = "#";
    convenioLink.style.display = 'none';
    convenioShow.href = "#";
    convenioShow.style.display = 'none';
    texto.innerHTML = 'SIN PERMISOS';
    bar_hidde.style.display = 'none';
  } else {
    permisos.style.display = 'none';
  }

  var user = Parameter.usuario;
  let empleadosData = new FormData();
  empleadosData.append('user', user);
  fetch('./php/getEmpleados.php', {
    method: 'POST',
    body: empleadosData
  })
    .then(dat => dat.json())
    .then(datos => {
      const empleado = document.getElementById('empleado');
      empleado.innerHTML = datos.nombre + ' - (' + datos.id + ')';
    })
});

let btn_logout = document.getElementById('btn_logout');
btn_logout.addEventListener('click', function (e) {
  e.preventDefault();
  const jsonParameters = localStorage.getItem('parameters');
  const Parameter = JSON.parse(jsonParameters);
  var user = Parameter.usuario;
  console.log(Parameter.usuario)
  let formData = new FormData();
  formData.append('user', user);
  fetch('./php/logout.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data === 'Ok') {
        localStorage.removeItem('parameters');
        document.location.href = "./login.html";
      }
    })
});

function getCookie(nombreCookie) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    // Verifica si la cookie comienza con el nombre que estamos buscando
    if (cookie.indexOf(nombreCookie + '=') === 0) {
      // Extrae el valor de la cookie
      return cookie.substring(nombreCookie.length + 1, cookie.length);
    }
  }
  // Si la cookie no se encuentra, devuelve null
  return null;
}