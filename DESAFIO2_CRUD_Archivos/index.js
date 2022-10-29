//importo el archivo llamado clase.js
const claseContenedor=require("./clase.js")

//le coloco la ruta del archivo al constructor de la clase mencionada
const productos=new claseContenedor("./productos.json");


/******************************************************************************************* */ 
/******************************************************************************************* */
async function ejecutar(){

/******************************************************************************************* */ 
/**********************Creo cuatro objetos para agregarlos al archivo con save************* */
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

/******************************************************************************************* */ 
/************Utilizo save creado en clase.js para agregar al JSON objetos******************* */

await productos.save(objeto1);
await productos.save(objeto2);
await productos.save(objeto3);
await productos.save(objeto4);


//muestro en pantalla un objeto en particular
console.log(await productos.getByid(2));

//muestro en pantalla todos los objetos
console.log(await productos.getAll());

//borro del archivo un objeto en particular
await productos.deleteByid(4);

//borro del archivo todos los objetos
await productos.deleteAll();
/******************************************************************************************* */ 
/******************************************************************************************* */
}

/******************************************************************************************* */ 
/******************************************************************************************* */

//ejecuto la funcion, la cual entrara en accion al indicar el comando "node index.js" en la consola
ejecutar()
