const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario.model');
const Producto = require('../models/producto.model');

app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ ok: false, err: { message: 'No hay archivos para subir' } });
    }

    // Validar Tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: { message: 'Los tipos permitidos son : ' + tiposValidos.join(', ') }
        });
    }

    let archivo = req.files.archivo;

    // Extenciones validas
    const extVal = ['png', 'jpg', 'gif', 'jpeg'];
    const arrayNombre = archivo.name.split('.');
    const extArchivo = arrayNombre[arrayNombre.length - 1];

    if (extVal.indexOf(extArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            extension: extArchivo,
            err: { message: 'Extension no valida. Las extensiones permitidas son ' + extVal.join(', ') }
        });
    }

    // cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`./uploads/${tipo}/${nombreArchivo}`, (err) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        // Aca se cargan se actualizan las imagenes
        switch (tipo) {
            case 'usuarios':
                imagenUsuario(id, res, nombreArchivo);
                break;
            case 'productos':
                imagenProducto(id, res, nombreArchivo);
                break;
        }

    });

});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borrarArchivo(usuarioDB.img, 'usuarios');
            return res.status(500).json({ ok: false, err });
        }

        if (!usuarioDB) {
            borrarArchivo(usuarioDB.img, 'usuarios');
            return res.status(400).json({ ok: false, err: { message: 'Usuario no existe' } });
        }

        // Verificar imagen FS
        borrarArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, userDB) => {

            res.json({ ok: true, usuario: userDB, img: nombreArchivo });

        });


    });
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borrarArchivo(productoDB.img, 'productos');
            return res.status(500).json({ ok: false, err });
        }

        if (!productoDB) {
            borrarArchivo(productoDB.img, 'productos');
            return res.status(400).json({ ok: false, err: { message: 'El producto no existe' } });
        }

        // Verificar imagen FS
        borrarArchivo(productoDB.img, 'productos');


        productoDB.img = nombreArchivo;
        productoDB.save((err, prodDB) => {
            res.json({ ok: true, producto: prodDB, img: nombreArchivo });
        });


    });

}

function borrarArchivo(nombreImg, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImg}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;