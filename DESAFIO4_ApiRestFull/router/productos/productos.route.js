//inicializo express
const express = require('express')

/*idCreator es el archivo js que utilizo para crear el id de los productos que tengo en data.js*/
const createId = require('../../middleware/idCreator')


//inicializo router
const router = express.Router()

//traigo el json que contiene los productos
const {products} = require('../../data/data')



//agregando ID a todo el contenido de products que se encuentra en data.js
router.use(createId)


//Este enpoint muestra todos los productos colocando en el navegador http://localhost:8080/api/products
router.get('/', (req,res)=>{
    return res.json(products)
})


//Este endpoint muestra los productos en funcion al id,colocando ejemplo http://localhost:8080/api/products/3
router.get('/:productId', (req, res)=>{

    //con req.params capturo el id que coloco en el navegador 
    const { productId } = req.params

    //con find recorro products que es el json de data.js buscando el id buscado
    const searchedProduct = products.find(item=>item.id === +productId)

    //si no encuentro el id envia 404
    if (!searchedProduct) {
        return res.status(404).json({ resultado: false, error: `El producto: ${productId} no existe`});
    }else{
        //si encuentro el id en data.js entonces lo muestro ya que lo guarde en searchedProduct
        return res.json({ resultado: true, result: searchedProduct });
    }
})



/*Este enpoint captura los datos del formulario de index.html,
y con esos datos le hace un push a products que se encuentra en data.js*/
router.post('/' ,(req, res)=>{

/*con req.body capturo lo que el usuario me coloca en el cuerpo del json si el ingreso es por postman, o lo capturo con los datos del form si es por index.html*/
    const{title,price,thumbnail}=req.body


    /*if(!title || !price || !thumbnail){
        return res.status(400).json({resultado:false, error:"Error en los datoss"})
    }*/

/*al producto encontrado le agrego un id, para ello utilizo length para saber el max de productos que tengo y le sumo uno*/ 
    const newProduct={
        title,
        price,
        thumbnail,
        id :products.length + 1
    };

    //agrego el nuevo producto a products que esta en data.js
    products.push(newProduct);

    //muestro el producto agregado en el navegador
    return res.json({Exito: true, Agregado:newProduct})
})



//put lo utilizo para editar por medio del id, el json de data.js
router.put('/:productId', (req, res)=>{

//con req.params capturo el id del producto que el usuario quiere editar y lo guardo en productId
const {productId} = req.params

//con req.body capturo con postman a traves de un json que le paso, el title, price y thumbnail
const {title,price,thumbnail}=req.body

/*if(!title||!price||!thumbnail){
    return res.status(400).json({resultado:false, error:"Error en los datos"})
}*/

//busco en products el index(posicion dentro del json) donde se encuentra productId.
const productIndex = products.findIndex(item => item.id === +productId)

//si no encuentra el producto tira un error 404
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}

//incorporo el nuevo producto a newProduct
const newProduct = {...products[productIndex], title,price,thumbnail}

/*aprovechando que ya se en que indice dentro de products tengo el dato a modificar, lo piso con lo que tengo en newProduct*/
products[productIndex] = newProduct;

/*muestro en la pantalla del navegador lo que modifique */
return res.json({Exito: true, Modificado: newProduct})

})

/*utilizo este endpoint para borrar por id */
router.delete('/:productId', (req, res)=>{
//utilizo req.params para capturar el id que quiero borrar y lo guardo en productId
const {productId} = req.params

//en funcion al id, busco el mismo dentro de products, para obtener el index dentro de json de dicho id.
const productIndex = products.findIndex(item => item.id === +productId)

//si no encuentro el producto tiro un 404
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}

//si encuentro el producto con splice lo borro.
products.splice(productIndex,1)

//muestro el mensaje que se borro el producto con el id indicado
return res.json({ Exito: true, Resultado: 'Eliminado correctamente' });
})

//exporto este modulo para poder utilizarlo desde otro js
module.exports = router