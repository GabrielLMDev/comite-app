let data = [];

function buscarEmpleado() {
  let inputNombre = document.getElementById("nEmpleado").value;
  let selectResultado = document.getElementById("resultado");

  // Realiza una solicitud AJAX para obtener resultados de la base de datos
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./php/search_Empleado.php?nombre=" + inputNombre, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Borra las opciones anteriores
      while (selectResultado.firstChild) {
        selectResultado.removeChild(selectResultado.firstChild);
      }

      // Parsea la respuesta JSON y crea las opciones del select
      data = JSON.parse(xhr.responseText);
      let option = document.createElement("option");
      option.value = '';
      option.text = "Selecciona";
      selectResultado.appendChild(option);
      data.forEach(function (cliente) {
        let option = document.createElement("option");
        option.value = cliente.nEmpleado;
        option.text = cliente.nombre;
        selectResultado.appendChild(option);
      });

      // Muestra u oculta el select según la cantidad de resultados
      if (data.length > 0) {
        selectResultado.style.display = "block";
      } else {
        selectResultado.style.display = "none";
      }
    }
  };

  xhr.send();
}

function seleccionarEmpleado() {
  let selectResultado = document.getElementById("resultado");
  let inputNombre = document.getElementById("nEmpleado");
  let selectedOption = selectResultado.options[selectResultado.selectedIndex];
  let inputPuesto = document.getElementById('puesto');

  // Asigna el valor del ID al campo inputNombre
  inputNombre.value = selectedOption.value;

  // Obtén y asigna el valor del "puesto" al campo inputPuesto (suponiendo que los datos del puesto se almacenan en el objeto cliente)
  let clienteData = data.find(function (cliente) {
    return cliente.nEmpleado == selectedOption.value;
  });
  if (clienteData) {
    inputPuesto.value = clienteData.puesto;
  } else {
    inputPuesto.value = '';
  }

}

function borrarSeleccion() {
  let selectResultado = document.getElementById("resultado");
  let inputNombre = document.getElementById("nEmpleado");

  // Borra la selección del select y el valor del campo inputNombre
  selectResultado.selectedIndex = -1;
  inputNombre.value = "";
}

