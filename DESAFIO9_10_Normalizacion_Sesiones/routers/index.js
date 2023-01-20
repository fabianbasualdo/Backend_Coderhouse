const { Router } = require("express");
const router = Router();


//utilizo routers/index.js para partir de las siguientes rutas, utilizando cada uno de los siguientes archivos.
const productsRouter = require('./productsRouter')
const chatRouter = require('./chatRouter') //lo manejo desde app.js porque me da error
const fakerRouter = require('./fakerRouter')
const sessionRouter = require('./sessionRouter')

router.use('/productos', productsRouter) // las rutas del archivo productsRouter partiran desde /productos
router.use('/chat', chatRouter) //las rutas del archivo charRouter partiran desde /chat
router.use('/', fakerRouter)
router.use('/', sessionRouter)

module.exports = router;