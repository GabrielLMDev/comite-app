function buscarClientes() {
  let inputNombre = document.getElementById("busqueda").value;
  let selectResultado = document.getElementById("resultado");

  // Realiza una solicitud AJAX para obtener resultados de la base de datos
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./php/search_cliente.php?nombre=" + inputNombre, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Borra las opciones anteriores
      while (selectResultado.firstChild) {
        selectResultado.removeChild(selectResultado.firstChild);
      }

      // Parsea la respuesta JSON y crea las opciones del select
      let data = JSON.parse(xhr.responseText);
      let option = document.createElement("option");
      option.value = null;
      option.text = "Selecciona";
      selectResultado.appendChild(option);
      data.forEach(function (cliente) {
        let option = document.createElement("option");
        option.value = cliente.id;
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

function seleccionarCliente() {
  let selectResultado = document.getElementById("resultado");
  let inputNombre = document.getElementById("busqueda");
  let selectedOption = selectResultado.options[selectResultado.selectedIndex];

  // Asigna el valor del ID al campo inputNombre
  inputNombre.value = selectedOption.value;
}

function borrarSeleccion() {
  let selectResultado = document.getElementById("resultado");
  let inputNombre = document.getElementById("busqueda");

  // Borra la selección del select y el valor del campo inputNombre
  selectResultado.selectedIndex = -1;
  inputNombre.value = "";
}
