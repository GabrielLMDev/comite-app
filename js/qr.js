function generarQRCode(texto) {
    let contenedor = document.getElementById('qr-code');
    let qrcode = new QRCode(contenedor, {
        text: texto,
        width: 110,
        height: 110,
    });
}
window.addEventListener("DOMContentLoaded", () => {
    let textoParaCodificar = "https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=14070780466_CAS9705281A8";
    generarQRCode(textoParaCodificar);
});