const express = require('express')


const productsRouter = require('./products/products.router')
const cartRouter = require('./cart/cart.router')


const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))


/*este modulo al unirse con index.js de forma completa sera /api/products mas lo que contenga productsRouter que se encuentra en el archivo products.router*/
router.use('/products', productsRouter)

/*este modulo al unirse con index.js de forma completa sera /api/cart mas lo que contenga productsRouter que se encuentra en el archivo cart.router*/
router.use('/cart', cartRouter)

//exporto para poder accederlo
module.exports = router