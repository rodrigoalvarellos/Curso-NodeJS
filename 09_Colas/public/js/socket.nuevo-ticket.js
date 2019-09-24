// Comando para establecer la com

var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});