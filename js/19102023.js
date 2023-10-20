const datos_consulta = document.getElementById("datos_consulta");
const tabla_hidde = document.getElementById("tabla_hidde");
const search_user_Form = document.getElementById("search_user_form");
const mesSelect = document.getElementById("mes");
let mesSeleccionado;

mesSelect.addEventListener("change", function () {
  // Obtener el valor seleccionado en el select
  mesSeleccionado = mesSelect.value;

  // Hacer algo con el valor, por ejemplo, imprimirlo en la consola
  console.log("Mes seleccionado:", mesSeleccionado);
});
function formaPago(valor) {
  if (valor) {
    return 'EFECTIVO';
  } else {
    return 'DEPOSITO';
  }
}
function formatearMoneda(valor) {
  let moneda = parseFloat(valor);
  return moneda.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN" // Cambia esto según tu moneda deseada
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const dataTable = $("#dataTable").DataTable();

  search_user_Form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Hacer la solicitud a la API del servidor
    fetch(
      `./php/getNominasporMes.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        dataTable.clear().draw();
        if (data.length > 0) {
          // Agregar los nuevos datos a la tabla
          data.forEach((nomina) => {
            dataTable.row.add([
              nomina.nAsalariado,
              nomina.puesto,
              formatearMoneda(nomina.salarioBase),
              formatearMoneda(nomina.bonificaciones),
              formatearMoneda(nomina.deducciones),
              formatearMoneda(nomina.salarioNeto),
              nomina.idEmpleado,
              nomina.resumenMensual,
              formaPago(nomina.tipo),
              nomina.referencia,
              nomina.folio
            ]).draw();
          });
        } else {
          alert("No se encontraron registros para el mes seleccionado.");
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    console.log('mes para el fetch ' + mesSeleccionado);
    fetch(
      `./php/getSumaNomina.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let total = formatearMoneda(data);
          const nominasTotales = document.getElementById('nominasTotales');
          nominasTotales.innerHTML = 'En el mes de ' + mesSeleccionado + ' se han pagado ' + total + ' en Nominas';
        } else {
          const nominasTotales = document.getElementById('nominasTotales');
          nominasTotales.innerHTML = '';
          alert("No se encontraron registros para el mes seleccionado.");
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    tabla_hidde.hidden = false;
  });

});
