const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marcar la tarea como completada'
};

const argv = require('yargs')
    .command('crear', 'Nueva tarea', {
        descripcion
    })
    .command('actualizar', 'Actualizar el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Mostrar listado de tareas', {})
    .command('borrar', 'Elimina una tarea de la lista', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
};