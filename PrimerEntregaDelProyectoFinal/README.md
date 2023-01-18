# Indice de lo realizado en el proyecto


## index.js :

> `app.use('/api', apiRoutes)` : Este sera el endpoint donde iniciara el proyecto.
>
> El puerto por defecto sera el 8080
>
>`const apiRoutes = require('./routes/indexRoutes')` : apiRoutes sera el indice que contendra la ruta para direccionar hacia productos o hacia carrito.

> `indexRoutes`: se encuentra en la carpeta routes

# controllers
### cart.controllers.js : 


### products.controller.js : 

> `const { ProductsApi } = require('../models/indexApi')`: Este archivo contiene un modulo que redirige hacia el archivo products.api.js o hacia el archivo cart.api.js
>
> `const productsApi = new ProductsApi()`: Creo el objeto en memoria Ram de la pc. productsApi tendra todos los metodos de tipo ABM relacionados con el producto. el mencionado a su vez esta enlazado con el archivo contenedor.js que tiene los metodos de ABM del archivo fisico.
>
> `const getAllProducts = (req, res) => { return res.json(productsApi.getAll())
}`:  productsApi en su constructor carga this.products que lo carga al conectarse a contenedor.js de esa manera lee el archivo fisico. y podra listarlo a traves del metodo getAll()

>
> `const getProductById = (req, res) => {const { productId } = req.params const searchedProduct = productsApi.getById(productId)  return res.json({ result: searchedProduct });`: con req.params obtengo el id que coloca en la url. luego utilizo el metodo getByid para listar solo dicho producto.
>
> `const saveNewProduct = (req, res) => {const newProduct = productsApi.saveNew(req.body) return res.json({ Nuevo: newProduct })`: utilizo req.body para obtener los datos que el usuario coloco en el body de la pagina web, en los inputbox, luego utilizo el metodo saveNew para guardar el producto
>
> `const updateProduct = (req, res) => { 
    const { productId } = req.params
    const { name, desc, price, image } = req.body
    const newProduct = { name, desc, price, image }
    if (!name || !desc || !image || !price) return { error: 'Todos los campos son obligatorios!' };
    const updatedProduct = productsApi.updateById(newProduct, productId)
    return res.json({ Nuevo: updatedProduct.name })
}`: req.params para capturar el id por url, req.body destructuro las constantes para obtener los valores ingresados en el body por separado en cada constante. utilizo el metodo updateById para actualizar el producto.

>
> `const deleteProduct = (req, res) => {`:
>
> `module.exports = {
    productsApi,
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
}` : exporto los metodos para poder accederlos desde otro archivo.



# middleware
### adminChecker.js :


# models
### cart
#### cart.ap.js : 
#### carts.txt :

### products
#### data.txt : 
#### products.api.js : 


### contenedor.js :
### indexApi.js :

# routes


### cart
#### cart.router.js :
> `const { adminChecker } = require('../../middleware/adminChecker')`
>
> `const {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
} = require('../../controllers/cart.controller')`

>
> El archivo `cart.controller.js` tendra los metodos que utilizaremos en los endpoint.

>
> `router.post('/', adminChecker, postNewCart)`:Cuando detecta el endpoint /api/cart/, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo postNewCart. En postman debo colocar POST
>
> `router.delete('/:cartId', adminChecker, deleteCart)`:Cuando detecta el endpoint /api/cart/:cartId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo deleteCart. En postman debo colocar delete
>
> `router.get('/:cartId', adminChecker, getCartProducts)`:Cuando detecta el endpoint /api/cart/:cartId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo getCartProducts. En postman debo colocar get
>
> `router.post('/:cartId/products/:productId', adminChecker, postNewProduct)`:Cuando detecta el endpoint /api/cart/:cartId/products/:productId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo postNewProduct. En postman debo colocar POST

>
> `router.delete('/:cartId/products/:productId', adminChecker, deleteProductCart)`:Cuando detecta el endpoint /api/cart/:cartId/products/:productId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo deleteProductCart. En postman debo colocar delete

### products.router.js :
> `const { adminChecker } = require('../../middleware/adminChecker')`
>
> `const {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
} = require('../../controllers/products.controller')`

> El archivo `products.controller.js` tendra los metodos que utilizaremos en los endpoint.

> `router.get('/', getAllProducts)`: Cuando detecta el endpoint /api/products/, ejecuta el metodo getAllProducts. En postman debo colocar GET
> 
> `router.get('/:productId', adminChecker, getProductById)`: Cuando detecta el endpoint /api/products/:productId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo getproductById. En postman debo colocar GET

>
> `router.post('/', adminChecker, saveNewProduct)`:
Cuando detecta el endpoint /api/products/, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo saveNewProduct. En postman debo colocar POST
>
> `router.put('/:productId', adminChecker, updateProduct)`: Cuando detecta el endpoint /api/products/:productId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo updateProduct. En postman debo colocar PUT
>
> `router.delete('/:productId', adminChecker, deleteProduct)`: Cuando detecta el endpoint /api/products/:productId, ejecuta el metodo adminChecker que chequea si el usuario es admin, si es admin entonces ejecutara el metodo deleteProduct. En postman debo colocar DELETE




### indexRoutes.js :

> `const productsRouter = require('./products/products.router')`
>
> `const cartRouter = require('./cart/cart.router')`

> `router.use('/products', productsRouter)`: Los productos comenzaran con el endpoint /api/products/ y luego entrara a el router llamado productsRouter que tendra definido como continuara la ruta del endpoint de productos.
>
> `router.use('/cart', cartRouter)` : el carrito comenzara con el endpoint /api/cart/ y luego entrara en el router llamado cartRouter que tendra definido como continuara la ruta del endpoint de carrito.



