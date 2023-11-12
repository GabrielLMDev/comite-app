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
  if (valor === '0') {
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
  const dataTableAportaciones = $("#dataTableAportaciones").DataTable();

  search_user_Form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Hacer la solicitud a la API del servidor
    fetch(
      `./php/getEgresosposMes.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        dataTable.clear().draw();
        if (data.length > 0) {
          // Agregar los nuevos datos a la tabla
          data.forEach((egresos) => {
            dataTable.row.add([
              egresos.concepto,
              egresos.beneficiario,
              formatearMoneda(egresos.monto),
              egresos.resumenMensual,
              '(' + egresos.idEmpleado + ') - ' + egresos.nomEmpleado,
              egresos.fecha,
              egresos.folio,
              egresos.n_documento
            ]).draw();
          });
        } else {
          alert("No se encontraron egresos para el mes seleccionado.");
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    console.log('mes para el fetch ' + mesSeleccionado);
    fetch(
      `./php/getSumaEgresos.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let total = formatearMoneda(data);
          const entradas = document.getElementById('entradas');
          entradas.innerHTML = 'En el mes de ' + mesSeleccionado + ' se ha gastado ' + total + ' en Egresos Diversos';
        } else {
          const entradas = document.getElementById('entradas');
          entradas.innerHTML = '';
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    ///////////////////////////////////////////////////////////////////

    fetch(
      `./php/getAportacionesporMes.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        dataTableAportaciones.clear().draw();
        if (data.length > 0) {
          // Agregar los nuevos datos a la tabla
          data.forEach((aportaciones) => {
            dataTableAportaciones.row.add([
              aportaciones.concepto,
              aportaciones.beneficiario,
              formatearMoneda(aportaciones.monto),
              aportaciones.resumenMensual,
              aportaciones.idEmpleado,
              aportaciones.fecha,
              aportaciones.folio,
              aportaciones.tipo,
              formaPago(aportaciones.metodo_pago),
              aportaciones.folio_documento
            ]).draw();
          });
        } else {
          alert("No se encontraron aportaciones para el mes seleccionado.");
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    fetch(
      `./php/getSumaAportaciones.php?mes=` + mesSeleccionado
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let total = formatearMoneda(data);
          const sumaAportaciones = document.getElementById('sumaAportaciones');
          sumaAportaciones.innerHTML = 'En el mes de ' + mesSeleccionado + ' se ha gastado ' + total + ' en Aportaciones';
        } else {
          const sumaAportaciones = document.getElementById('sumaAportaciones');
          sumaAportaciones.innerHTML = '';
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));




    tabla_hidde.hidden = false;
  });

});
