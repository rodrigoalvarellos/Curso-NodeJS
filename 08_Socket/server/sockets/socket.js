const { io } = require('../server');

// pasa saber cuando un cliente se conecta al servidor
io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicacion'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchar al cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje.usuario) {
        //     callback({ resp: 'Todo salio BIEN!' });
        // } else {
        //     callback({ resp: 'Todo salio MAL :(' });
        // }

    });
});