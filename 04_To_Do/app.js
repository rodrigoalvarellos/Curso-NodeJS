// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;

const toDo = require('./to-do/to-do');
const colors = require('colors');



console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Crear Nota');
        let tarea = toDo.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        console.log('Mostrar todas las tareas por hacer');

        let listado = toDo.getListado();

        for (const tarea of listado) {

            console.log('====== Por Hacer ======'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('======================='.green);
        }

        break;

    case 'actualizar':
        console.log('Actualizar una tarea ');

        let actualizado = toDo.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);

        break;
    case 'borrar':

        let borrado = toDo.borrar(argv.descripcion);
        console.log('Tarea borrada: ', borrado);
        break;

    default:
        console.log('Comando no es reconocido');
        break;
}