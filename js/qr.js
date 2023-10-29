function generarQRCode(texto) {
    var contenedor = document.getElementById('qr-code');
    var qrcode = new QRCode(contenedor, {
        text: texto,
        width: 110,
        height: 110,
    });
}
window.addEventListener("DOMContentLoaded", () => {
    var textoParaCodificar = "https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=14070780466_CAS9705281A8";
    generarQRCode(textoParaCodificar);
});