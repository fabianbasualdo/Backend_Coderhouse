class Usuario {
    constructor(nuevoNombre, nuevoApellido, nuevoLibros, nuevoMascotas) {
        this.nombre = nuevoNombre
        this.apellido = nuevoApellido
        this.libros = nuevoLibros
        this.mascotas = nuevoMascotas
    }
    getFullName() {
        return console.log(`Su nombre es ${this.nombre} y su apellido es ${this.apellido}`)
    }
    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota)
    
    }
    countMascotas() {
        return console.log(`La cantidad de mascotas son: ${this.mascotas.length}`)
    }
    addBook(nuevoNombre, nuevoAutor) {
        this.libros.push({ nombre: nuevoNombre, autor: nuevoAutor })
    }


    getBookNames() {
        const nombreLibros = []
        this.libros.forEach(libro => {
            nombreLibros.push(libro.nombre)
        })
        console.log("Los libros de este cliente son:")
        return nombreLibros.forEach(nombrelib => console.log(`${nombrelib}, \n`))

    }


    getMascotas() {
        console.log("Las mascotas de este cliente son:");
        return this.mascotas.forEach(mascota => { console.log(` ${mascota},\n`) })
    }
}

//creo el objeto llamado cliente
//coloco los valores al constructor, con new reservo espacio en memoria para dicho objeto
const cliente = new Usuario("Marcelo", "Basualdo", [{ nombre: "Piense y hagase rico", autor: "Napoleon Hill" }], ["Gato"])

//llamo a los metodos de la clase, que haran referencia al objeto cliente
cliente.getFullName()
cliente.addMascota("Perro")
cliente.countMascotas()
cliente.addBook("El poder del ahora", "Eckhart Tolle")
cliente.addBook("Los secretos de la mente millonaria", "T. Harv Eker")

//los metodos get los uso para mostrar en pantalla el valor de los atributos
cliente.getBookNames()
cliente.getMascotas()


//creo el objeto llamado cliente2
//coloco los valores al constructor, con new reservo espacio en memoria para dicho objeto
const cliente2=new Usuario("Roberto","Ledesma",[{nombre:"El hombre mas rico de babilonia",autor:"George Clason"}],["Tortuga"])

//llamo a los metodos de la clase, que haran referencia al objeto cliente2
cliente2.getFullName()
cliente2.addMascota("Mono")
cliente2.addMascota("Paloma")
cliente2.countMascotas()
cliente2.addBook("Tus zonas erroneas", "Wayne Dyer")

//los metodos get los uso para mostrar en pantalla el valor de los atributos
cliente2.getBookNames()
cliente2.getMascotas()