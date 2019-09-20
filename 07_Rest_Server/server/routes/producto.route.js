const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const Producto = require('../models/producto.model');
const app = express();


// ============================
// Obtener productos
// ============================
app.get('/productos', [verificaToken], (req, res) => {
    // paginados, populados
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 10;

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({ ok: false, err });
            }
            if (!productos) {
                return res.status(400).json({ ok: false, err });
            }

            Producto.countDocuments({ disponible: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({ ok: false, err });
                }
                res.json({
                    ok: true,
                    cuantos: conteo,
                    productos
                });
            });
        });


});

// ============================
// Obtener un producto
// ============================
app.get('/productos/:id', [verificaToken], (req, res) => {
    // un prod por id
    const id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec(
            (err, productoDB) => {
                if (err) {
                    return res.status(500).json({ ok: false, err });
                }
                if (!productoDB) {
                    return res.status(400).json({ ok: false, err: { message: 'No se encontro un producto con ese ID' } });
                }

                res.json({
                    ok: true,
                    producto: productoDB
                });
            });

});

// ============================
// Buscar productos
// ============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    const termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({ ok: false, err });
            }

            res.json({
                ok: true,
                productos
            });

        });



});

// ============================
// Crear producto
// ============================
app.post('/productos', [verificaToken], (req, res) => {
    // Crear un nuevo producto
    // grabar usuario y categoria
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }
        if (!productoDB) {
            return res.status(400).json({ ok: false, err });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ============================
// Obtener productos
// ============================
app.put('/productos/:id', [verificaToken], (req, res) => {
    // Actualizar
    let id = req.params.id;
    let body = req.body;

    const nuevoProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    };

    Producto.findByIdAndUpdate(id, nuevoProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!productoDB) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// ============================
// Obtener productos
// ============================
app.delete('/productos/:id', [verificaToken], (req, res) => {

    // actualiza el estado a false
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoBorrado) => {

        // Si ocurre un error
        if (err) {
            return res.status(400).json({ ok: false, err });
        }
        // si el usuario es null
        if (!productoBorrado) {
            return res.status(400).json({ ok: false, err: { message: 'Usuario no encontrado' } });
        }
        // respuest correcta
        res.json({ ok: true, producto: productoBorrado, message: 'Producto Borrado' });

    });

});

module.exports = app;