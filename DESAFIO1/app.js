class Usuario {

    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libro = [
            { nombre: "Los secretos de la mente millonaria", autor: "T. Harv Eker" },
            { nombre: "Piense y hagase rico", autor: "Napoleon Hill" },
            { nombre: "El poder del ahora", autor: "Eckhart Tolle" }
        ];

        this.mascotas = ["Perro", "Gato", "Tortuga"];
    }

    getFullName() {
        console.log(`Su nombre es: ${this.nombre} y su apellido es ${this.apellido}`)
    }

    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
        console.log(`La mascota fue agrega, el usuario ahora tiene : ${this.mascotas}`);
    }

    countMacotas() {
        console.log(`La cantidad de mascotas que tiene el usuario es: ${this.mascotas.length}`)
    }

    addBooks(nuevoLibro, nuevoAutor) {
        this.libro.push({nombre: nuevoLibro, autor: nuevoAutor})
        console.log(`El libro fue agregado ${nuevoLibro}`)
    }

    getBookNames(){

        let NombreLibro = []
        this.libro.forEach(libros => NombreLibro.push(libros.nombre))
        
        console.log(NombreLibro)
    }

}

const cliente = new Usuario("Marcelo Fabian", "Basualdo");
cliente.getFullName();
cliente.addMascota("Loro");
cliente.countMacotas();
cliente.addBooks("Padre rico, padre pobre", "Robert Kiyosaki");
cliente.getBookNames();
