// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Karla', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
Chart.defaults.global.defaultFontColor = '#858796';
var periodosTotales, periodosPagados, periodosTotales1;
var numero;
var dataset
window.addEventListener('DOMContentLoaded', () => {
  var cliente = getCookie("cliente");
  let clienteData = new FormData();
  clienteData.append('cliente', cliente);
  fetch('./php/contador_pago.php', {
    method: 'POST',
    body: clienteData
  })
    .then(dat => dat.json())
    .then(datos => {
      const pp = document.getElementById('pp');
      const ppp = document.getElementById('ppp');
      periodosPagados = datos.pagados;
      periodosTotales = datos.totales;
      periodosTotales1 = periodosTotales - periodosPagados;
      pp.innerHTML = periodosPagados;
      ppp.innerHTML = periodosTotales1;
      dataset = {
        data: [periodosPagados, periodosTotales1],
        backgroundColor: ['#f6c23e', '#e74a3b'],
        hoverBackgroundColor: ['#ffb700', '#ff1500'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      };
      var ctx = document.getElementById("myPieChart");
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Periodos Pagados", "Periodos por Pagar"],
          datasets: [dataset],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 80,
        },
      });
    })
});
function getCookie(nombreCookie) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie + '=') === 0) {
      return cookie.substring(nombreCookie.length + 1, cookie.length);
    }
  }
  return null;
}


