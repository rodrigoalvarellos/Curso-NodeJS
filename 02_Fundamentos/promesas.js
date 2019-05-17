let empleados = [{
    id: 1,
    nombre: 'Rodrigo'
}, {
    id: 2,
    nombre: 'Fernando'
}, {
    id: 3,
    nombre: 'Moncho'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];




let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            reject(`No existe un empleado con el ID ${ id }`);
        } else {
            resolve(empleadoDB);
        }

    });

};

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        let salarioDB = salarios.find(salario => salario.id === empleado.id);

        if (!salarioDB) {
            reject(`No se encontro un usuario para el usuario ${ empleado.nombre}`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }

    });

};


// getEmpleado(1).then(empleado => {
//     console.log('Empleado de BD: ', empleado);

//     getSalario(empleado).then(salario => {
//         console.log('El Salario del empleado es: ', salario);
//     }, err => console.log(err));

// }, err => console.log(err));


// ===========================================
// Promesas encadena
// ===========================================

getEmpleado(1).then(empleado => {

        // Retorno la siguiente promesa para encadenar los then
        return getSalario(empleado);

    }).then(resp => {
        console.log('El Salario del empleado es: ', resp);
    })
    .catch(err => {
        console.log(err);
    });