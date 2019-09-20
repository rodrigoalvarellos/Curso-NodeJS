const jwt = require('jsonwebtoken');

// ======================
// Verificar Token
// ======================
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // con el Get accedo a los headers

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({ ok: false, err: { message: 'Token no valido' } });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

// ======================
// Verifica Admin Role
// ======================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({ ok: false, err: { message: 'No tiene permiso de ADMIN' } });
    }
};


// ======================
// Verifica token en Img
// ======================
const verificaTokenImg = (req, res, next) => {

    const token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({ ok: false, err: { message: 'Token no valido' } });
        }

        req.usuario = decoded.usuario;
        next();
    });

};


module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
};