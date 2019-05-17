// setTimeout(() => {

//     console.log('Hola Mundo');

// }, 1000);

let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'Rodrigo',
        id
    };

    if (id === 20) {
        callback(`El usuario con id ${id} no existe.`);
    } else {
        callback(null, usuario);
    }


};

getUsuarioById(10, (err, usuario) => {

    if (err) {
        console.log(err);
        return;
    }
    console.log('Usuario de BD ', usuario);
});