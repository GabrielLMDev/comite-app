function generarQRCode(texto) {
    var contenedor = document.getElementById('qr-code');
    var qrcode = new QRCode(contenedor, {
        text: texto,
        width: 110,
        height: 110,
    });
}
window.addEventListener("DOMContentLoaded", () => {
    var textoParaCodificar = "Prueba de Codigo QR hecho por Gabriel Luengas";
    generarQRCode(textoParaCodificar);
});