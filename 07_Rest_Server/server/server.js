require('./config/config');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Habilitar la carpeta Public
app.use(express.static(path.resolve(__dirname, '../public')));


// Configuracion Global de Rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});