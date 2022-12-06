const express = require('express')
const {adminChecker} = require('../../middleware/adminChecker')


/*llamo al archivo cart.controller.js para acceder a sus metodos para despues utilizarlos en los endpoint*/
const {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart
} = require('../../controllers/cart.controller')

//inicio un router
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

//http://localhost:8080/api/cart/
router.post('/',adminChecker, postNewCart)

//http://localhost:8080/api/cart/1
router.delete('/:cartId',adminChecker, deleteCart)

//http://localhost:8080/api/cart/1
router.get('/:cartId' ,adminChecker,getCartProducts)

//http://localhost:8080/api/cart/1/products/2
router.post('/:cartId/products/:productId',adminChecker, postNewProduct)

//http://localhost:8080/api/cart/1/products/2
router.delete('/:cartId/products/:productId',adminChecker, deleteProductCart)

module.exports = router