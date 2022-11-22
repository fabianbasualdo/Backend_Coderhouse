/* 
Para que Express pueda representar archivos de plantilla, deben establecerse los siguientes valores de aplicación:

views, el directorio donde se encuentran los archivos de plantilla. Ejemplo: app.set('views', './views')
view engine, el motor de plantilla que se utiliza. Ejemplo: app.set('view engine', 'pug')
*/

const express = require('express')
//const path = require('path')

//createId lo utilizo para colocarle un id a los productos
const createId = require('../middleware/idCreator.js')

//inicializo express
const appProducts = express()
//inicializo router
const router = express.Router()

//obtengo los productos
const {products} = require('../data/data.js')

//las carpetas que le asigno a express.static, podre acceder a su contenido desde el navegador
appProducts.use(express.static('../views'))

//le indico a express que le pasare json
appProducts.use(express.json());
appProducts.use(express.urlencoded({ extended: true }));



//Le indico a express el directorio donde se encuentran los archivos de plantilla
appProducts.set('views', '../views')
//Le indico a express el motor de plantilla que se utiliza
appProducts.set('view engine', 'pug')




//le coloco un id a los productos
router.use(createId)


/*recordemos que esta raiz se debe sumar al raiz que tiene el router configurado por defecto 
que es /products quedando la url con este get como products/ */
router.get('/', (req,res)=>{
    //products.pug es un archivo de la carpeta views, que dibuja una tabla con los productos de data.js
    res.render('products.pug', {products})
})

// product/id
router.get('/:productId', (req, res)=>{
    //recordemos que con params capturo el id de la url
    const { productId } = req.params
    //con find busco el id del producto
    const searchedProduct = products.find(item=>item.id === +productId)

    //si no encuentra el id producto mostrara un error 404
    if (!searchedProduct) {
        return res.status(404).json({ resultado: false, error: `El producto: ${productId} no existe`});
    }else{

        //si encuentra el producto lo mostrara por pantalla
        return res.json({ resultado: true, result: searchedProduct });
    }
})

// products/
router.post('/' ,(req, res)=>{
//con req.body capturo los valores que el usuario capturo por pantalla
    const{title,price,thumbnail}=req.body

    if(!title || !price || !thumbnail){
        return res.status(400).json({resultado:false, error:"Error en los datos"})
    }

/* Guardo en newProduct los valores obtenidos utilizando req.body, con length me fijo el tamaño del json y le sumo uno para posicionarlo con un id mas.*/
    const newProduct={
        title,
        price,
        thumbnail,
        id :products.length + 1
    };

    //realizo un push (inserto) al json que se encuentra en data
    products.push(newProduct);
    //redirecciono la pagina a la raiz.
    res.redirect('/')
})


// products/id
router.put('/:productId', (req, res)=>{
    //recordemos que put es para realizar modificaciones
    //con req.params obtengo el id que el usuario coloco en la url
const {productId} = req.params

//con req.body obtengo los valores que el usuario coloco en el body del formulario
const {title,price,thumbnail}=req.body

//si en el body no coloco los valores me arroja un error 404
if(!title||!price||!thumbnail){
    return res.status(400).json({resultado:false, error:"Error en los datos"})
}

//busco dentro del json el indice(posicion dentro del archivo) del producto por el id
const productIndex = products.findIndex(item => item.id === +productId)

//si el indice es -1 quiere decir que findIndex no encontro lo que buscaba, tirara error 404
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}

//agrego a newProduct los valores que ingreso el usuario por req.body
const newProduct = {...products[productIndex], title,price,thumbnail}
//agrego newProduct al json que se encuentra en data
products[productIndex] = newProduct;

//muestro en pantalla 
return res.json({Exito: true, Modificado: newProduct})

})


// products/id
router.delete('/:productId', (req, res)=>{
const {productId} = req.params
const productIndex = products.findIndex(item => item.id === +productId)
if (productIndex < 0) {
    return res.status(404).json({ resultado: false, error: "No existe ese producto"});
}
products.splice(productIndex,1)
return res.json({ Exito: true, Resultado: 'Elminado correctamente' });
})

module.exports = router