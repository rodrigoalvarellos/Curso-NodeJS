// function sumar(a, b) {
//     return a + b;
// }

// let sumar = (a, b) => a + b;

// console.log(sumar(15, 20));

// function saludar() {
//     return 'Hola mundo';
// }

// let saludar = () => 'Hola mundo';

// function saludar(nombre) {
//     return `Hola ${nombre}`;
// }

// let saludar = nombre => `Hola ${nombre}`;

// console.log(saludar('Rodrigo'));

let deadpool = {
    nombre: 'Wade',
    apellido: 'Wilson',
    poder: 'Regeneracion',
    getNombre() {
        return `${ this.nombre } ${this.apellido} - poder: ${this.poder}`;
    }
};

console.log(deadpool.getNombre());