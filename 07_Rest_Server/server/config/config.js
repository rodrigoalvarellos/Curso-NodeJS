// ====================
// PUERTO
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
// ENTORNO
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// Tokens
// ====================
process.env.CADUCIDAD_TOKEN = '48h'; // 60seg * 60min * 24hs * 30dias
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
// heroku config:set SEED="este-es-el-seed-produccion"

// ====================
// Base de datos
// ====================
let local = 'mongodb://localhost:27017/cafe';
// let remota = 'mongodb+srv://ralvarellos69:H4293tS2JN3PJ2Y7@cluster0-alygm.mongodb.net/cafe';
// Guardo la cadena como una variable de entorno en Heroku usando heroku config:set ...
let remota = process.env.MONGO_URI;
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = local;
} else {
    urlDB = remota;
}

// seteo la variable en el process enviroment
process.env.urlDB = urlDB;

// ====================
// Google Client ID
// ====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '85181410942-pgck0dos48a7udj3ml14ig0jp4s6esdl.apps.googleusercontent.com';