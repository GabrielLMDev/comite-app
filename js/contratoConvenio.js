document.addEventListener("DOMContentLoaded", async function () {
    const logo = new Image();
    logo.src = 'img/banner_contrato.png';

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
                data.idPeriodo = data.idPeriodo == 10 ? 'Periodos Adeudados' : 'Periodo ' + data.idPeriodo;

                const doc = new jsPDF({
                    orientation: 'portrait',
                    format: 'letter'
                });

                doc.addImage(logo, 'png', 20, 7, 175, 39);
                let currentDate = getDate();
                doc.setFontSize(10);
                doc.setFont("arial", "bold", "normal");
                doc.text('AYOTLA, IXTAPALUCA, EDO. DE MEX. A ' + currentDate.day + ' DE ' + currentDate.monthName + ' DEL AÑO ' + currentDate.year, 77, 51);


                /*doc.text('texto', COORDENADA X, COORDENADA Y);*/
                doc.setFontSize(11);
                doc.setFont("arial", "regular", "normal");
                doc.text('Folio: ' + data.folio, 14, 60);
                doc.setFontSize(13);
                doc.setFont("times", "bold", "normal");
                doc.text('CONVENIO DE LIQUIDACION', 75, 65);
                doc.setFontSize(12);
                doc.setFont("arial", "normal", "normal");
                let text = 'Usuario C.' + data.Cliente +
                    ', hace el presente convenio de liquidación de ' +
                    data.idPeriodo + ' de agua potable por la cantidad de ' +
                    formattingCurrency(data.Convenio) + ' pesos, realizando su primer pago por la cantidad de ' +
                    formattingCurrency(data.Pago_Inicial) + ' pesos, restando la cantidad de ' +
                    formattingCurrency(data.Restante) + ' pesos, con domicilio ' + data.Direccion +
                    ' perteneciente al pueblo de Ayotla municipio de Ixtapaluca estado de México, la deuda debera liquidarse en ' +
                    data.Plazo + ' Pagos, tomando en cuenta como primer pago, el realizado a partir del día ' + data.Fecha;

                let maxWidth = 188;
                let textLines = doc.splitTextToSize(text, maxWidth);
                let textHeight = textLines.length * 10;
                doc.text(textLines, 14, 80, { align: 'justify' });

                let n = data.Plazo;
                let dataTable = [];
                let row;
                for (let i = 1; i <= n; i++) {
                    if (i == 1) {
                        row = [i + 'ª  PAGO'];
                        row.push(data.Fecha);
                        row.push(formattingCurrency(data.Pago_Inicial));
                    } else {
                        row = [i + 'ª  PAGO'];
                        for (let j = 0; j < n; j++) {
                            row.push('');
                        }
                    }
                    dataTable.push(row);
                }

                // Definir la configuración de la tabla con estilos personalizados
                var tableConfig = {
                    startY: 115,
                    head: [['Pago Numero', 'Fecha', 'Monto a Pagar', 'Firma de conformidad']],
                    body: dataTable,
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

                /*NUEVA HOJA*/
                doc.addPage('letter', 'portrait');
                doc.addImage(logo, 'png', 20, 7, 175, 39);
                currentDate = getDate();
                doc.setFontSize(10);
                doc.setFont("arial", "bold", "normal");
                doc.text('AYOTLA, IXTAPALUCA, EDO. DE MEX. A ' + currentDate.day + ' DE ' + currentDate.monthName + ' DEL AÑO ' + currentDate.year, 77, 51);


                /*doc.text('texto', COORDENADA X, COORDENADA Y);*/
                doc.setFontSize(11);
                doc.setFont("arial", "regular", "normal");
                doc.text('Folio: ' + data.folio, 14, 60);
                doc.setFontSize(13);
                doc.setFont("times", "bold", "normal");
                doc.text('CONVENIO DE LIQUIDACION', 75, 65);
                doc.setFontSize(12);
                doc.setFont("arial", "normal", "normal");
                text = 'Usuario C.' + data.Cliente +
                    ', hace el presente convenio de liquidación de ' +
                    data.idPeriodo + ' de agua potable por la cantidad de ' +
                    formattingCurrency(data.Convenio) + ' pesos, realizando su primer pago por la cantidad de ' +
                    formattingCurrency(data.Pago_Inicial) + ' pesos, restando la cantidad de ' +
                    formattingCurrency(data.Restante) + ' pesos, con domicilio ' + data.Direccion +
                    ' perteneciente al pueblo de Ayotla municipio de Ixtapaluca estado de México, la deuda debera liquidarse en ' +
                    data.Plazo + ' Pagos, tomando en cuenta como primer pago, el realizado a partir del día ' + data.Fecha;

                maxWidth = 188;
                textLines = doc.splitTextToSize(text, maxWidth);
                textHeight = textLines.length * 10;
                doc.text(textLines, 14, 80, { align: 'justify' });

                n = data.Plazo;
                dataTable = [];
                for (let i = 1; i <= n; i++) {
                    if (i == 1) {
                        row = [i + 'ª  PAGO'];
                        row.push(data.Fecha);
                        row.push(formattingCurrency(data.Pago_Inicial));
                    } else {
                        row = [i + 'ª  PAGO'];
                        for (let j = 0; j < n; j++) {
                            row.push('');
                        }
                    }
                    dataTable.push(row);
                }

                // Definir la configuración de la tabla con estilos personalizados
                var tableConfig = {
                    startY: 115,
                    head: [['Pago Numero', 'Fecha', 'Monto a Pagar', 'Firma de conformidad']],
                    body: dataTable,
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


                const pdfDataUri = doc.output('blob');

                // Crear una URL de objeto blob para el blob generado
                var blobUrl = URL.createObjectURL(pdfDataUri);
                var iframe = '<iframe width="80%" height="80%" src="' + blobUrl + '"></iframe>';
                window.open(blobUrl);
                //document.location.href = "./index.html";
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
function formattingCurrency(value) {
    let coin = parseFloat(value);
    return coin.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    });
}
function getDate() {
    let namesMonths = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return {
        day: day,
        month: month,
        monthName: namesMonths[month - 1],
        year: year
    };
}