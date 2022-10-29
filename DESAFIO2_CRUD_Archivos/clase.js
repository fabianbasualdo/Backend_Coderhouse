const { write } = require('fs');
const fs=require('fs/promises')

class Contenedor{

/******************************************************************************************* */ 
/******************************************************************************************* */ 
constructor(fileName){

    //el constructor me pasa el nombre del archivo y su extension 
this.fileName=fileName;
    //con el nombre del archivo creo la ruta donde estara el archivo
this.filePath=`./${fileName}`;

this.data=(async ()=>{
try{
    //con la ruta donde esta el archivo leo el contenido del archivo
const readingFile=await fs.readFile(this.filePath,'UTF-8');

//retorno el archivo leido
return JSON.parse(readingFile)

}catch(error){
//si algo dentro del try falla, ejecutare el codigo dentro de catch
console.error(error.message);
//si el try falla devuelvo un vacio
return [];
}

})();

}//fin del constructor

/******************************************************************************************* */ 
/******************************************************************************************* */ 


/******************************************************************************************* */ 
/******************************************************************************************* */ 

//metodo para escribir el archivo, el cual recibe como parametro el contenido a agregar a dicho archivo.
async write(data){
    try{
        //this.filePath es la propiedad que ingreso por medio del constructor
    await fs.writeFile(this.filePath,JSON.stringify(data,null,3));
    }catch(error){
    console.error(error.message)
    }
    }
/******************************************************************************************* */ 
/******************************************************************************************* */ 


/******************************************************************************************* */ 
/******************************************************************************************* */ 

async save(objeto){

try{

    //this.data se encuentra en el constructor y tiene el contenido del archivo
const contenidoArchivo=await this.data;
let nuevoId=0;
//si el contenido del archivo es cero entonces el id sera 1
//si el archivo tiene contenido recorro las posiciones del objeto dentro del archivo y al ultimo le capturo el id, para sumarle uno a dicho id para utilizarlo con el nuevo objeto.
contenidoArchivo.length===0?(nuevoId=1): (nuevoId=contenidoArchivo[contenidoArchivo.length-1].id+1);

//creo el objeto previo a pushearlo(agregarlo) a la constante que tiene el contenido del archivo.
let nuevoObjeto={id:nuevoId,...objeto}

//asigno el nuevo contenido a la constante mencionada
contenidoArchivo.push(nuevoObjeto);

//escribo el archivo con el nuevo contenido incorporado
await this.write(contenidoArchivo)

//retorno el id del nuevo objeto
return nuevoObjeto.id
}
catch(error){
console.error(error.message)
}


}
/******************************************************************************************* */ 
/*******************************busca el producto por id*********************************** */ 
async getByid(id){
try{

    //obtengo el contenido del archivo accediendo a la propiedad data declarada en el constructor
const contenidoArchivo=await this.data
//busco dentro del contenido del archivo el id del producto.
const itemEncontrado=contenidoArchivo.find(item=>item.id===id);
if(!itemEncontrado){
    //si no encuentra el id, entonces retorna null
    return null;
}

//si el id esta dentro del archivo, lo retorna
return itemEncontrado ;

}catch(error){
    console.error("Hubo un error al traer el objeto" + error.message)
}

}
/******************************************************************************************* */ 
/********************************muestra todos los productos******************************* */ 
async getAll(){
    try{
        //accedo a la propiedad data declarada en el constructor
        const contenidoArchivo= await this.data
        //retorno el contenido completo del archivo
        return contenidoArchivo
    }
    catch (error){
    console.error("Error al leer el archivo "+error.message)
    }
   
}
/******************************************************************************************* */ 
/***********************borro un objeto del archivo buscandolo por id********************** */ 
async deleteByid(id){
    try{
        const contenidoArchivo= await this.data
    let AdjuntoNoBorrare=contenidoArchivo.filter(item=>item.id!=id)
    await this.write(AdjuntoNoBorrare);
    }catch(error){
        console.error("Se produjo un error al intentar borrar por id "+error.message)
    }
    
}
/******************************************************************************************* */ 
/*******************************borro todo el archivo************************************** */
async deleteAll(){
    try{
    let nuevoContenido = []
    await this.write(nuevoContenido)
    }catch(error){
        console.log(error)
    }
}


}
module.exports=Contenedor
