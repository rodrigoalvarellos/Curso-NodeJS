const express = require('express');
const bcrypy = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario.model');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;


    Usuario.find({ estado: true }, 'nombre email role estado google img') // El nombre de los campos que quiero mostrar
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                });


            });


        });


});

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypy.hashSync(body.password, 10),
        // img: body.img
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });
});

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });

});

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        // Si ocurre un error
        if (err) {
            return res.status(400).json({ ok: false, err });
        }
        // si el usuario es null
        if (!usuarioBorrado) {
            return res.status(400).json({ ok: false, err: { message: 'Usuario no encontrado' } });
        }
        // respuest correcta
        res.json({ ok: true, usuario: usuarioBorrado });

    });




});

module.exports = app;