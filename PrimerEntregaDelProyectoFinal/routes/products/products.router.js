const express = require('express')


const { adminChecker } = require('../../middleware/adminChecker')


/*al igualarlo al archivo products.controller.js utilizando requirre, que tiene metodos con este array, podre llamar a sus metodos que son los mencionados en const*/
const {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
} = require('../../controllers/products.controller')


//inicio un router
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))


/*este modulo se une con indexRoutes.js y completo quedara asi: /api/products/ mas lo que tenga getAllProducts*/
//aqui utilizo router.get porque le paso un metodo para que ejecute.
router.get('/', getAllProducts)

//este modulo se une con indexRoutes.js y completo quedara asi: /api/products/productId
router.get('/:productId', adminChecker, getProductById)
//cuando detecta esta ruta en la url,ejecutara el metodo para ver si es admin, y luego el metodo getProductById que viene del archivo products.controller.js


/*al detectar la señal de tipo Post que envia el formulario, u postman ejecutara los metodos indicados "adminChecket" y si pasa ejecutara "saveNewProduct"*/
router.post('/', adminChecker, saveNewProduct)

/* router.put: se utiliza para realizar update*/
router.put('/:productId', adminChecker, updateProduct)

/*router.delete: se utiliza para borrar un producto en funcion al id */
router.delete('/:productId', adminChecker, deleteProduct)


//exporto el modulo para poder accederlo desde afuera
module.exports = router;