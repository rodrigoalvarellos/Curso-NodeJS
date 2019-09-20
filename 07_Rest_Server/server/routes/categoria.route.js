const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

const Categoria = require('../models/categoria.model');

// ===================================
// Mostrar todas las categorias
// ===================================
app.get('/categoria', [verificaToken], (req, res) => {
    // Todas las categorias

    Categoria.find({})
        .sort('descripcion') // Ordena por este campo
        .populate('usuario', 'nombre email') // Sirve para rellenar los campos ObjectID
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({ ok: false, err });
            }

            res.json({ ok: true, categorias });

        });

});
// ===================================
// Mostrar una categoria por ID
// ===================================
app.get('/categoria/:id', [verificaToken], (req, res) => {

    const id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }
        if (!categoriaDB) {
            return res.status(400).json({ ok: false, err: { message: 'No encontro una categoria con ese ID' } });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});
// ===================================
// Mostrar una categoria por ID
// ===================================
app.post('/categoria', [verificaToken], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!categoriaDB) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});
// ===================================
// Mostrar una categoria por ID
// ===================================
app.put('/categoria/:id', [verificaToken], (req, res) => {
    // DEscripcion de la categoria
    let id = req.params.id;
    let body = req.body;

    console.log(id);
    console.log(body);

    descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!categoriaDB) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });




});
// ===================================
// Mostrar una categoria por ID
// ===================================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // Solo el Admon puede borrar categorias
    // Categoria.findByIdAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({ ok: false, err: { message: 'El ID no existe' } });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });

    });




});






module.exports = app;