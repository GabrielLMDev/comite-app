const datos_consulta = document.getElementById("datos_consulta");
const tabla_hidde = document.getElementById("tabla_hidde");
const search_user_Form = document.getElementById("search_user_form");
var inicio = document.getElementById("inicio");
var final = document.getElementById("final");

document.addEventListener("DOMContentLoaded", function () {
  const dataTable = $("#dataTable").DataTable();
  search_user_Form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fecha_inicio = inicio.value;
    var fecha_fin = final.value;
    // Hacer la solicitud a la API del servidor
    fetch(
      `./php/getPagosporFecha.php?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    )
      .then((response) => response.json())
      .then((data) => {
        dataTable.clear().draw();
        if (data.length > 0) {
          // Agregar los nuevos datos a la tabla
          data.forEach((pago) => {
            dataTable.row.add([pago.idEmpleado, pago.total_pago]).draw();
          });
        } else {
          alert(
            "No se encontraron registros en el rango de fechas especificado."
          );
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    fetch(
      `./php/getEntradasporFecha.php?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Acceder al total de pagos y mostrarlo en algún lugar de tu página
        const totalPagos = data.total_pagos;
        if (totalPagos === null) {
          const entradas = document.getElementById('entradas');
          entradas.innerHTML = `El saldo al corte entre la fecha  ${fecha_inicio} y ${fecha_fin} es de 0`;
        } else {
          const entradas = document.getElementById('entradas');
          entradas.innerHTML = `El saldo al corte entre la fecha  ${fecha_inicio} y ${fecha_fin} es de ${totalPagos}`;
        }
      })
      .catch((error) => console.error("Error al hacer la solicitud:", error));

    tabla_hidde.hidden = false;
  });
});
