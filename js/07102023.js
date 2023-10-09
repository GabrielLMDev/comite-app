const buscar_contrato = document.getElementById('buscar_contrato');
const datos_contrato = document.getElementById('datos_contrato');
const search_user_Form = document.getElementById('search_user_form');
const btn_pago = document.getElementById('btn_pago');
let newfolio, contrato, cliente, id_periodo, obs, montoPago;
search_user_Form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n_User = new FormData(search_user_Form);
    fetch('./php/getCliente.php', {
        method: 'POST',
        body: n_User
    })
        .then(res => res.json())
        .then(data => {
            var mensaje, titulo;
            if (data != 'No_Existe') {
                buscar_contrato.hidden = true;
                let n_contrato = document.getElementById('n_contrato');
                n_contrato.innerHTML = data.idContrato;
                contrato = data.idContrato;
                let n_cliente = document.getElementById('n_cliente');
                n_cliente.innerHTML = data.idCliente;
                cliente = data.idCliente;
                let nombre_usuario = document.getElementById('nombre_usuario');
                nombre_usuario.innerHTML = data.nombre;
                let direccion = document.getElementById('direccion');
                direccion.innerHTML = data.direccion;
                btn_pago.disabled = true;
                // Obtener la fecha y hora actual
                var fechaHoraActual = new Date();

                // Obtener el año actual
                var year = fechaHoraActual.getFullYear().toString().slice(-2);
                var month = fechaHoraActual.getMonth() + 1; // Sumar 1 porque el mes comienza desde 0
                var day = fechaHoraActual.getDate();
                var hour = fechaHoraActual.getHours();
                var minutes = fechaHoraActual.getMinutes();
                var seconds = fechaHoraActual.getSeconds();
                newfolio = year + (month < 10 ? "0" : "") + month + (day < 10 ? "0" : "") + day + (hour < 10 ? "0" : "") + hour + (minutes < 10 ? "0" : "") + minutes + (seconds < 10 ? "0" : "") + seconds;
                const folio = document.getElementById('folio');
                folio.innerHTML = newfolio;
                datos_contrato.hidden = false;

            } else if (data === 'No_Existe') {
                titulo = 'ERROR EN BUSQUEDA';
                mensaje = 'El Contrato o Cliente no existe';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'No_Existe_Datos') {
                titulo = 'ERROR EN BUSQUEDA';
                mensaje = 'No existen datos del cliente';
                showCustomAlert(titulo, mensaje);
            }
        })
});

let customAlertButton = document.getElementById('customAlertButton');
customAlertButton.addEventListener('click', function (e) {
    e.preventDefault();
    hideCustomAlert();
})

function showSuccess(titulo, mensaje) {
    var customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';

    var customAlertTitle = document.getElementById('customAlertTitle');
    customAlertTitle.innerHTML = titulo;

    var customAlertContent = document.getElementById('customAlertContent');
    customAlertContent.innerHTML = mensaje;
}

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
    document.location.href = "./nuevo_pago.html";
}

$(document).ready(function () {
    var selectPeriodos = $('#periodo');
    var montoSeleccionado = $('#total_pago');

    // Realizar una solicitud AJAX para obtener los datos desde PHP
    $.ajax({
        url: './php/getPeriodo.php',
        dataType: 'json',
        success: function (data) {
            // Llenar el select con los datos recibidos
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var fechaStr = data[i].fecha;
                    var fechaObj = new Date(fechaStr);
                    var year = fechaObj.getFullYear();
                    var month = fechaObj.getMonth() + 1; // El mes comienza desde 0
                    var day = fechaObj.getDate();
                    var fechaFormateada = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
                    selectPeriodos.append($('<option>', {
                        value: data[i].idPeriodo,
                        text: data[i].nombre_periodo + " - " + fechaFormateada
                    }));
                }

                // Configurar un controlador de eventos para el cambio de selección
                selectPeriodos.on('change', function () {
                    var selectedId = $(this).val();
                    //                    obtenerMontoPorId(data, selectedId);
                    if (selectedId == 0) {
                        montoSeleccionado.text("Selecciona periodo");
                        btn_pago.disabled = true;
                    } else {
                        var selectedMonto = data[selectedId - 1].monto;
                        var periodoId = data[selectedId - 1].idPeriodo;
                        id_periodo = periodoId;
                        montoPago = selectedMonto;
                        montoSeleccionado.text(selectedMonto);
                        btn_pago.disabled = false;
                    }
                });
            } else {
                console.log('No se encontraron registros en la tabla periodos.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX: ' + status + ' - ' + error);
        }
    });
});

const payment_user_form = document.getElementById('payment_user_form');
payment_user_form.addEventListener('submit', function (e) {
    const observaciones = document.getElementById('observaciones');
    obs = observaciones.value;
    e.preventDefault();
    var setPago = new FormData();
    setPago.append('contrato', contrato);
    setPago.append('cliente', cliente);
    setPago.append('id_periodo', id_periodo);
    setPago.append('newfolio', newfolio);
    setPago.append('obs', obs);
    setPago.append('montoPago', montoPago);
    fetch('./php/setPago.php', {
        method: 'POST',
        body: setPago
    })
        .then(res => res.json())
        .then(data => {
            var mensaje, titulo;
            if (data === 'Ok') {
                titulo = 'PAGO CORRECTO';
                mensaje = 'El pago se ha realizado de manera exitosa.';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'Error 947') {
                titulo = 'ERROR 947';
                mensaje = 'Error en primer filtro, consultar con el administrador';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'Error 948') {
                titulo = 'ERROR 948';
                mensaje = 'Error en segundo filtro, consultar con el administrador';
                showCustomAlert(titulo, mensaje);
            } else if (data === 'Pagado') {
                titulo = 'PERIODO PAGADO';
                mensaje = 'El Usuario ya cuenta con ese pago';
                showCustomAlert(titulo, mensaje);
            }
        })
});
