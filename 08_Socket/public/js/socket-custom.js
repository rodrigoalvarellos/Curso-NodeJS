var socket = io();

// Los ON escuchan info
socket.on('connect', function() {
    console.log('Desde Index...Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el server');
});

// Los emit son para enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Rodrigo',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('Respuesta Server', resp);
});

socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor', mensaje);
});