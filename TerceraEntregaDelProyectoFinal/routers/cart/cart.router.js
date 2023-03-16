const express = require('express')

const {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart,
    purchaseCart
} = require('../../controllers/cart.controller')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))


//dibuja en pantalla cart.html
router.get('/', (req,res)=>{
    res.render('cart.html')
   
})


/*crea un nuevo carrito, con un array de productos vacio llamado product[], para ir cargando los productos*/
router.post('/', postNewCart)

//borra del carrito en funcion al cartId
router.delete('/:cartId', deleteCart)

//busca un carrito en funcion al cartId
router.get('/:cartId' ,getCartProducts)


//Insert un nuevo producto al carrito, colocando:
// localhost:8080/1/products/1
router.post('/:cartId/products/:productId', postNewProduct)


//borra un producto del carrito, colocando
// localhost/1/products/1
router.delete('/:cartId/products/:productId', deleteProductCart)


//sirve para cerrar la compra de los productos que se encuentran en el carrito
// localhost:8080/1
router.post('/:cartId', purchaseCart)

module.exports = router