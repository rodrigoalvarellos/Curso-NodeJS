console.log('Codigo de Typescript');

import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

// Arrancar Server
const server = Server.init( 3000 );
server.app.use(router);

// Arrancar DB
MySQL.instance;


server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});

