const  Conteiner =require("./clase.js")
const productos= new Conteiner("./productos.json")

async function ejecutar(){
    const objeto4={
        nombre:"faina  ",
        precio:100,
        thumbnail:"url"
    }
   const objeto3={
    nombre:"empanada de j y q ",
    precio:320,
    thumbnail:"url"
}
const objeto2={
    nombre:"empanada carne  ",
    precio:324,
    thumbnail:"url"
}

const objeto1={
    nombre:"pizza  ",
    precio:300,
    thumbnail:"url"
}


await productos.getById(4).then(id=>console.log(id))
}
ejecutar()