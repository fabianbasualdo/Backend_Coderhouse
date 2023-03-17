const express = require('express')
const productsRouter = require('./products/products.router')
const cartRouter = require('./cart/cart.router')
const authRouter = require('./auth/authRoute')
const fileRouter = require('./file/fileRoute')
const CartDao = require('../models/daos/cart/CartDaoMongoDB')
const ProductsDao = require('../models/daos/products/ProductsDaoMongoDB')
const {infoLogger, errorLogger} = require('../utils/logger/index')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/auth', authRouter)
router.use('/file', fileRouter)

const cartDao = new CartDao()
const productsDao = new ProductsDao()

router.get('/', async (req,res)=>{
    try {

        const sessionName = req.user //
        //console.log(`sessionName es actualmente: ${console.log(JSON.stringify(req.user))}`)

        const allProducts = await productsDao.getAll()

        if(sessionName){
            //console.log("entro en sessionName")
            const sessionCart = await cartDao.getById(sessionName.cart)

            //renderiza sessionName, sessionCart, y todos los productos
            return res.render('index', {sessionName, sessionCart, allProducts})
        }

        
        //de lo contrario solo renderiza en pantalla sessionName y todos los productos
            res.render('index', {sessionName, allProducts})
        
    } catch (error) {
        errorLogger.error(new Error(error));
    }
})


router.get('/desloguear', (req,res)=>{
    const deslogueoName = req.user
    //req.logout();
    req.session.destroy();
    infoLogger.info('User logued out!');
    res.render('index',{deslogueoName})

});

router.get('/login',(req,res)=>{
    res.render('login.html')
})

router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});

router.get('*', (req, res)=>{
    const router = req.url;
    const method = req.method;
    warnLogger.warn(`Route: ${router}. Method: ${method}`);
    res.status(404).send('no bueno. Mal ahí: 404')
  });
module.exports = router