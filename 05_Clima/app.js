const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

console.log(argv.direccion);

// lugar.getLugarLatLng(argv.direccion)
//     .then(console.log);

clima.getClima(-31.400000, -64.190002)
    .then(console.log)
    .catch(console.log);