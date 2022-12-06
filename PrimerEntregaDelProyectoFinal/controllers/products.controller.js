
/*indexApi es un archivo que contiene un modulo, que llama al archivo products.api
el cual tiene la clase que maneja los productos con sus metodos, y a su vez conecta con el archivo contenedor.js que conecta con el archivo puro. */
const { ProductsApi } = require('../models/indexApi')


//instancio para acceder a la clase ProductsApi que contiene los metodos asociados con productos.
const productsApi = new ProductsApi()



const getAllProducts = (req,res)=>{
    return res.json(productsApi.getAll())
};

const getProductById = (req,res)=>{
     //con params obtengo el valor que coloque en la url
    const { productId } = req.params
    //busca el producto por id, el id es el que coloco en la url
    const searchedProduct = productsApi.getById(productId)
    //muestro en el navegador el producto encontrado
    return res.json({result: searchedProduct });
};

const saveNewProduct = (req,res)=>{
    //con req.body obtengo todos los datos incorporados en el navegador
    const newProduct = productsApi.saveNew(req.body)
    //muestro en el navegador el nuevo producto
    return res.json({Nuevo: newProduct})
};

 const updateProduct = (req,res)=>{
    //obtengo el id del producto con req.params
    const {productId} = req.params

    //req.body lo utilizo para acceder a la informacion que coloca el usuario en el navegador
    const {name,desc,price,image} = req.body

    //creo un array con los datos que inserto el usuario en el navegador
    const newProduct = {name,desc,price,image}

    if (!name || !desc || !image || !price ) return { error: 'Todos los campos son obligatorios!' };

    //actualizo por id, con los datos que ingreso el usuario en la web
    const updatedProduct = productsApi.updateById(newProduct, productId)

    return res.json({Nuevo:updatedProduct.name})
}


const deleteProduct = (req,res)=>{
    const {productId} = req.params
    
    const deletedProduct = productsApi.deleteById(productId)

    if (deletedProduct.error) return res.status(404).send(deletedProduct.error);
  return res.json({Eliminado:deletedProduct});
};

//exporto los metodos para poder accederlos desde afuera
module.exports = {
    productsApi,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}