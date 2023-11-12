// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
  $.ajax({
    url: './php/getMovimientos.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        // Los datos se almacenan en la variable "data"
        console.log('DATA FIND');
    },
    error: function(error) {
        console.error('Error al obtener los datos: ' + error);
    }
  });
});