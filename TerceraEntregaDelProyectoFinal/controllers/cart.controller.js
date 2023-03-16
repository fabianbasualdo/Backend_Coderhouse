const {CartsDao} = require('../models/daos/indexApi')
const {productsApi} = require('./products.controller')
const UserDaoMongoDB=require('../models/daos/users/userDao')
const mongoose = require('mongoose')
const {newPurchase} = require('../utils/nodemailer')
const {infoLogger, errorLogger} = require('../utils/logger/index')

const cartApi = new CartsDao()
const userApi = new UserDaoMongoDB()


/********************************CREA EL CARRITO********************************* */
//el carrito lo crea con el userid, la hora, y un array de productos vacio.
//CREA EL CARRITO
const postNewCart =async (userId, res)=>{
    try {
        const totalCarts = await cartApi.getAll()
            
        //Estructura del nuevo carrito, el useId, la fecha, products[]
        const newCart = {
            owner : userId,
            timestamp : Date.now(),
            products:[],
        }

        //guarda en la base de datos el nuevo carrito
        const newMongoCart = await cartApi.save(newCart)
        
        return newMongoCart._id //retorna el id que le coloco al nuevo carrito

    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
    
}
/**************************************************************************** */


const deleteCart = (req,res)=>{
    try {
        const cartId = req.params.cartId
        cartApi.deleteById(cartId)
        return res.json({response:`Su carro id:${cartId} fué eliminado`})
    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}
const getCartProducts = async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const theCart = await cartApi.getById(cartId)
        //retorna un array donde tengo que especificar la posicion
        return res.json(theCart[0].products)
    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}


/***************************AGREGA PRODUCTOS AL CARRITO*****************************/
const postNewProduct = async(req,res)=>{
    try {

        //obtengo el  cardId y el productId de la url utilizando params
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const productId = mongoose.Types.ObjectId(req.params.productId);


        const theProduct = await productsApi.getById(productId)// traigo el producto utilizando su id.
        
        const theCart = await cartApi.getById(cartId);//traigo el carrito utilizando su id.


        theCart.products.push(theProduct);/*pusheo el producto encontrado en la const que tiene el carrito encontrado*/
    
        await cartApi.updateById(cartId, theCart);//actualizo el carrito en la base
        
        return res.json({response:`Se agregó el producto al carro.`});
    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error});
    }
}
/*********************************************************************************/



const deleteProductCart = async(req,res)=>{
    try {
        const cartId = mongoose.Types.ObjectId(req.params.cartId);
        const productId = mongoose.Types.ObjectId(req.params.productId);
        const theCart = await cartApi.getById(cartId);
        const index = theCart.products.findIndex(product => product._id === productId);
        theCart.products.splice(index, 1)
        
        await cartApi.updateById(cartId, theCart);
        return res.json({response:'Se eliminó el producto al carro.'})
    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    }
}

const purchaseCart = async(req,res)=>{
    try {


        const cartId = mongoose.Types.ObjectId(req.params.cartId); 
        const theCart = await cartApi.getById(cartId); 


        const userId = mongoose.Types.ObjectId(theCart.owner);
        const theOwner = await userApi.getById(userId);



        const newCart = {...theCart._doc, products:[]}

        await newPurchase(theOwner, theCart)

        await cartApi.updateById(cartId, newCart)

        return res.json({response: 'Pedido realizado. Compra en Proceso'})
    
    } catch (error) {
        errorLogger.error(error);
        return res.json({Error: `No se pudo realizar esta acción`, error})
    } 
}



module.exports = {
    postNewCart,
    deleteCart,
    getCartProducts,
    postNewProduct,
    deleteProductCart,
    purchaseCart
}