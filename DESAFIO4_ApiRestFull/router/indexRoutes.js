const express = require('express')

//traigo productos.route.js el cual contiene todos mis enpoint
const productsRouter = require('./productos/productos.route')

//inicio el router
const router = express.Router()


/*le indico a express que recibira un json */
router.use(express.json())
router.use(express.urlencoded({extended:true}))


/*le anexo a la ruta raiz del proyecto, el router llamado productsRouter el cual contiene los get, post, put y delete del proyecto con todos mis endpoint*/
router.use('/products', productsRouter)



module.exports = router