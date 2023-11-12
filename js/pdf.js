document.addEventListener("DOMContentLoaded", async function () {
  const logo = new Image();
  logo.src = 'img/img_01.png';

  const qr = new Image();
  qr.src = 'img/SAT.jpg';

  $('#btn_print').click(async function () {
    const n_cliente = getCookie('cliente');
    var url = window.location.href;
    var urlObj = new URL(url);
    var parametro = urlObj.searchParams.get("folio_pago");

    const urlPayment = './php/getPago.php';
    const parametros = {
      folio: parametro
    };

    const params = new URLSearchParams(parametros);
    const fullURL = `${urlPayment}?${params}`;

    try {
      const response = await fetch(fullURL);
      if (response.ok) {
        const data = await response.json();

        if (data != null) {
          if (data.idPeriodo == 10) {
            data.idPeriodo = 'Periodos Adeudados';
          }
          const datos = {
            fecha: data.fecha_pago,
            folio: parametro,
            monto: data.monto,
            observaciones: data.observaciones,
            periodo: data.idPeriodo
          };

          const urlCliente = './php/getCliente.php';
          const parametroCliente = {
            busqueda: n_cliente
          };

          const pUrl = new URLSearchParams(parametroCliente);
          const URLCliente = `${urlCliente}?${pUrl}`;

          try {
            const responseCliente = await fetch(URLCliente);
            if (responseCliente.ok) {
              const dataCliente = await responseCliente.json();

              if (dataCliente != null) {
                const cliente = {
                  nombre: dataCliente.nombre,
                  direccion: dataCliente.direccion
                };
                const doc = new jsPDF({
                  orientation: 'portrait',
                  format: 'letter'
                });
                doc.addImage(logo, 'png', 5, 5, 45, 45);

                doc.setFontSize(13);
                /*doc.text('texto', COORDENADA X, COORDENADA Y);*/
                doc.text('CONSEJO ADMINISTRATIVO DEL SISTEMA DE AGUA POTABLE', 50, 15);
                doc.text('DE AYOTLA EDO. DE MEX. A.C.', 85, 20);
                doc.text('RFC.CAS9705281A8', 98, 25);
                doc.setFontSize(10);
                doc.text('C. Esperanza Ramírez #1, Col. Santo Tomas', 50, 40);
                doc.text('Tel: 55 4397 6276', 160, 40);
                doc.setFontSize(13);
                doc.setFont("times", "bold", "normal");
                doc.text('RECIBO', 97, 55);
                doc.setFontSize(11);
                doc.setFont("arial", "bold", "normal");
                doc.text('Folio: ' + datos.folio, 14, 60);
                doc.text('Nombre: ' + n_cliente + ' - ' + cliente.nombre, 14, 65);
                doc.text('Fecha: ' + datos.fecha, 14, 70);
                doc.text('Domicilio: ' + cliente.direccion, 14, 75);

                var dataTabla = [['1', 'Periodo ' + datos.periodo, '$' + datos.monto], ['', '', ''], ['', '', ''],
                ['', '', ''], ['', 'Total', '$' + datos.monto]];

                // Definir la configuración de la tabla con estilos personalizados
                var tableConfig = {
                  startY: 80,
                  head: [['Cantidad', 'Concepto', 'Importe']],
                  body: dataTabla,
                  styles: {
                    head: {
                      fillColor: [25, 77, 30],
                      textColor: [255, 255, 255]
                    },
                    body: {
                      fillColor: [192, 192, 192],
                      textColor: [0, 0, 0]
                    },
                    fontSize: 12
                  }
                };
                // Crear la tabla en el PDF
                doc.autoTable(tableConfig);
                var finalY = doc.lastAutoTable.finalY;

                // Escribir otro texto justo después de la tabla
                doc.text('Nota: ' + datos.observaciones, 14, finalY + 10);
                doc.setFontSize(11);
                doc.setFont("arial", "regular", "normal");
                doc.line(10, finalY + 45, 55, finalY + 45);
                doc.text('Domingo Nieto Medina', 14, finalY + 50);
                doc.line(80, finalY + 45, 120, finalY + 45);
                doc.text('Julio Pozos Mecalco', 84, finalY + 50);
                doc.line(150, finalY + 45, 202, finalY + 45);
                doc.text('Nombre y Firma de recibido', 154, finalY + 50);
                doc.setFontSize(8);
                doc.setFont("arial", "bold", "normal");
                doc.text('Tesorero', 25, finalY + 54);
                doc.text('Secretario', 93, finalY + 54);

                var canvas = document.getElementById("myPieChart");

                // Convertir el canvas a una imagen base64
                var imgData = canvas.toDataURL("image/png", 1.0);

                // Agregar la imagen al documento PDF
                doc.addImage(imgData, "png", 10, finalY + 65, 48, 40);
                doc.setFillColor(231, 74, 59);
                doc.circle(65, finalY + 80, 3, "F");
                doc.setFillColor(246, 194, 62);
                doc.circle(65, finalY + 90, 3, "F");
                doc.setFontSize(11);
                doc.text('Periodos pagados: ' + localStorage.getItem("pagados"), 70, finalY + 91);
                doc.text('Periodos por pagar: ' + localStorage.getItem("porpagar"), 70, finalY + 81);

                doc.addImage(qr, 'JPEG', 130, finalY + 65, 65, 45);

                //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
                doc.addImage(logo, 'PNG', 10, finalY + 110, 35, 35, 'LogoBanner', 'MEDIUM', '0');
                doc.line(58, finalY + 115, 58, finalY + 145);
                doc.setFontSize(12);
                doc.setFont("arial", "bold", "normal");
                doc.text('Te desea un FELIZ 2024 lleno de bendiciones', 90, finalY + 128);
                doc.text('SIEMPRE TRABAJANDO PARA TU BIENESTAR Y EL DE TU FAMILIA', 68, finalY + 133);

                doc.addPage('letter', 'portrait');

                doc.addImage(logo, 'png', 5, 5, 45, 45);

                doc.setFontSize(13);
                /*doc.text('texto', COORDENADA X, COORDENADA Y);*/
                doc.text('CONSEJO ADMINISTRATIVO DEL SISTEMA DE AGUA POTABLE', 50, 15);
                doc.text('DE AYOTLA EDO. DE MEX. A.C.', 85, 20);
                doc.text('RFC.CAS9705281A8', 98, 25);
                doc.setFontSize(10);
                doc.text('C. Esperanza Ramírez #1, Col. Santo Tomas', 50, 40);
                doc.text('Tel: 55 4397 6276', 160, 40);
                doc.setFontSize(13);
                doc.setFont("times", "bold", "normal");
                doc.text('RECIBO', 97, 55);
                doc.setFontSize(11);
                doc.setFont("arial", "bold", "normal");
                doc.text('Folio: ' + datos.folio, 14, 60);
                doc.text('Nombre: ' + n_cliente + ' - ' + cliente.nombre, 14, 65);
                doc.text('Fecha: ' + datos.fecha, 14, 70);
                doc.text('Domicilio: ' + cliente.direccion, 14, 75);

                var dataTabla = [['1', 'Periodo ' + datos.periodo, '$' + datos.monto], ['', '', ''], ['', '', ''],
                ['', '', ''], ['', 'Total', '$' + datos.monto]];

                // Definir la configuración de la tabla con estilos personalizados
                var tableConfig = {
                  startY: 80,
                  head: [['Cantidad', 'Concepto', 'Importe']],
                  body: dataTabla,
                  styles: {
                    head: {
                      fillColor: [25, 77, 30],
                      textColor: [255, 255, 255]
                    },
                    body: {
                      fillColor: [192, 192, 192],
                      textColor: [0, 0, 0]
                    },
                    fontSize: 12
                  }
                };
                // Crear la tabla en el PDF
                doc.autoTable(tableConfig);
                var finalY = doc.lastAutoTable.finalY;

                // Escribir otro texto justo después de la tabla
                doc.text('Nota: ' + datos.observaciones, 14, finalY + 10);
                doc.setFontSize(11);
                doc.setFont("arial", "regular", "normal");
                doc.line(10, finalY + 45, 55, finalY + 45);
                doc.text('Domingo Nieto Medina', 14, finalY + 50);
                doc.line(80, finalY + 45, 120, finalY + 45);
                doc.text('Julio Pozos Mecalco', 84, finalY + 50);
                doc.line(150, finalY + 45, 202, finalY + 45);
                doc.text('Nombre y Firma de recibido', 154, finalY + 50);
                doc.setFontSize(8);
                doc.setFont("arial", "bold", "normal");
                doc.text('Tesorero', 25, finalY + 54);
                doc.text('Secretario', 93, finalY + 54);

                var canvas = document.getElementById("myPieChart");

                // Convertir el canvas a una imagen base64
                var imgData = canvas.toDataURL("image/png", 1.0);

                // Agregar la imagen al documento PDF
                doc.addImage(imgData, "png", 10, finalY + 65, 48, 40);
                doc.setFillColor(231, 74, 59);
                doc.circle(65, finalY + 80, 3, "F");
                doc.setFillColor(246, 194, 62);
                doc.circle(65, finalY + 90, 3, "F");
                doc.setFontSize(11);
                doc.text('Periodos pagados: ' + localStorage.getItem("pagados"), 70, finalY + 91);
                doc.text('Periodos por pagar: ' + localStorage.getItem("porpagar"), 70, finalY + 81);

                doc.addImage(qr, 'JPEG', 130, finalY + 65, 65, 45);

                //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
                doc.addImage(logo, 'PNG', 10, finalY + 110, 35, 35, 'LogoBanner', 'MEDIUM', '0');
                doc.line(58, finalY + 115, 58, finalY + 145);
                doc.setFontSize(12);
                doc.setFont("arial", "bold", "normal");
                doc.text('Te desea un FELIZ 2024 lleno de bendiciones', 90, finalY + 128);
                doc.text('SIEMPRE TRABAJANDO PARA TU BIENESTAR Y EL DE TU FAMILIA', 68, finalY + 133);

                const pdfDataUri = doc.output('blob');

                // Crear una URL de objeto blob para el blob generado
                var blobUrl = URL.createObjectURL(pdfDataUri);
                var iframe = '<iframe width="80%" height="80%" src="' + blobUrl + '"></iframe>';
                window.open(blobUrl);
              } else {
                console.error('Error: Datos de cliente no encontrados');
              }
            } else {
              console.error('Error en la solicitud fetch del cliente:', responseCliente.statusText);
            }
          } catch (error) {
            console.error('Error en la solicitud fetch del cliente:', error);
          }
        } else {
          console.error('Error: Datos de pago no encontrados');
        }
      } else {
        console.error('Error en la solicitud fetch de pago:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud fetch de pago:', error);
    }
  });
});


function getCookie(nombreCookie) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === nombreCookie) {
      return cookie[1];
    }
  }
  return null;
}