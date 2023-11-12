document.addEventListener("DOMContentLoaded", async function () {
  const logo = new Image();
  logo.src = 'img/img_01.png';

  const qr = new Image();
  qr.src = 'img/SAT.jpg';

  var url = window.location.href;
  var urlObj = new URL(url);
  var parametro = urlObj.searchParams.get("folioConvenio");

  const urlPayment = './php/getConvenio.php';
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
        doc.text('RECIBO DE CONVENIO', 85, 55);
        doc.setFontSize(11);
        doc.setFont("arial", "bold", "normal");
        doc.text('Folio: ' + data.folio, 14, 60);
        doc.text('Nombre: ' + data.idCliente + ' - ' + data.Cliente, 14, 65);
        doc.text('Fecha: ' + data.Fecha, 14, 70);
        doc.text('Domicilio: ' + data.Direccion, 14, 75);

        var dataTablaInformacion = [
          [data.Periodos, 'Periodo ' + data.idPeriodo, formatearMoneda(data.Adeudo), formatearMoneda(data.Convenio), data.Plazo],
        ];

        // Definir la configuración de la tabla con estilos personalizados
        var tableConfig = {
          startY: 80,
          head: [['Periodos\nAdeudados', 'Periodo a\nPagar', 'Adeudo\nTotal', 'Monto\nNegociado', 'Cantidad de\nPagos']],
          body: dataTablaInformacion,
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

        var dataTabla = [
          [data.PlazoActual + ' de ' + data.Plazo, 'Periodo ' + data.idPeriodo, formatearMoneda(data.Pago), formatearMoneda(data.Pago_Inicial), formatearMoneda(data.Restante)],
          ['', 'Total Pagado: ', formatearMoneda(data.Pago)]
        ];

        // Definir la configuración de la tabla con estilos personalizados
        var tableConfig = {
          startY: finalY,
          head: [['Pago Numero', 'Concepto', 'Importe', 'Balance Actual', 'Restante']],
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
        doc.text('Nota: ' + data.Informacion, 14, finalY + 10);
        doc.setFontSize(11);
        doc.setFont("arial", "regular", "normal");
        doc.line(10, finalY + 45, 55, finalY + 45);
        doc.text('Carlos Pozos Bautista', 14, finalY + 50);
        doc.line(80, finalY + 45, 123, finalY + 45);
        doc.text('Domingo Nieto Medina', 84, finalY + 50);
        doc.line(150, finalY + 45, 190, finalY + 45);
        doc.text('Julio Pozos Mecalco', 154, finalY + 50);

        doc.text(data.Cliente, 11, finalY + 83);
        doc.line(10, finalY + 85, 62, finalY + 85);
        doc.text('Nombre y firma de recibido', 14, finalY + 90);

        doc.setFontSize(8);
        doc.setFont("arial", "bold", "normal");
        doc.text('Presidente', 25, finalY + 54);
        doc.text('Tesorero', 95, finalY + 54);
        doc.text('Secretario', 163, finalY + 54);

        doc.addImage(qr, 'JPEG', 130, finalY + 65, 65, 45);

        //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
        doc.addImage(logo, 'PNG', 10, finalY + 110, 35, 35, 'LogoBanner', 'MEDIUM', '0');
        doc.line(58, finalY + 115, 58, finalY + 145);
        doc.setFontSize(12);
        doc.setFont("arial", "bold", "normal");
        doc.text('Te desea un FELIZ 2024 lleno de bendiciones', 90, finalY + 128);
        doc.text('SIEMPRE TRABAJANDO PARA TU BIENESTAR Y EL DE TU FAMILIA', 68, finalY + 133);

        /*NUEVA HOJA*/
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
        doc.text('RECIBO DE CONVENIO', 85, 55);
        doc.setFontSize(11);
        doc.setFont("arial", "bold", "normal");
        doc.text('Folio: ' + data.folio, 14, 60);
        doc.text('Nombre: ' + data.idCliente + ' - ' + data.Cliente, 14, 65);
        doc.text('Fecha: ' + data.Fecha, 14, 70);
        doc.text('Domicilio: ' + data.Direccion, 14, 75);

        var dataTablaInformacion = [
          [data.Periodos, 'Periodo ' + data.idPeriodo, formatearMoneda(data.Adeudo), formatearMoneda(data.Convenio), data.Plazo],
        ];

        // Definir la configuración de la tabla con estilos personalizados
        var tableConfig = {
          startY: 80,
          head: [['Periodos\nAdeudados', 'Periodo a\nPagar', 'Adeudo\nTotal', 'Monto\nNegociado', 'Cantidad de\nPagos']],
          body: dataTablaInformacion,
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

        var dataTabla = [
          [data.PlazoActual + ' de ' + data.Plazo, 'Periodo ' + data.idPeriodo, formatearMoneda(data.Pago), formatearMoneda(data.Pago_Inicial), formatearMoneda(data.Restante)],
          ['', 'Total Pagado: ', formatearMoneda(data.Pago)]
        ];

        // Definir la configuración de la tabla con estilos personalizados
        var tableConfig = {
          startY: finalY,
          head: [['Pago Numero', 'Concepto', 'Importe', 'Balance Actual', 'Restante']],
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
        doc.text('Nota: ' + data.Informacion, 14, finalY + 10);
        doc.setFontSize(11);
        doc.setFont("arial", "regular", "normal");
        doc.line(10, finalY + 45, 55, finalY + 45);
        doc.text('Carlos Pozos Bautista', 14, finalY + 50);
        doc.line(80, finalY + 45, 123, finalY + 45);
        doc.text('Domingo Nieto Medina', 84, finalY + 50);
        doc.line(150, finalY + 45, 190, finalY + 45);
        doc.text('Julio Pozos Mecalco', 154, finalY + 50);

        doc.text(data.Cliente, 11, finalY + 83);
        doc.line(10, finalY + 85, 62, finalY + 85);
        doc.text('Nombre y firma de recibido', 14, finalY + 90);

        doc.setFontSize(8);
        doc.setFont("arial", "bold", "normal");
        doc.text('Presidente', 25, finalY + 54);
        doc.text('Tesorero', 95, finalY + 54);
        doc.text('Secretario', 163, finalY + 54);

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
        document.location.href = "./index.html";
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

function formatearMoneda(valor) {
  let moneda = parseFloat(valor);
  return moneda.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });
}