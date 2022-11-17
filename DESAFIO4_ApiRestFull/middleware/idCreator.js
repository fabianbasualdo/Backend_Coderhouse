//traigo data.js que contiene products por eso lo desectructuro
const {products} = require('../data/data')

const createId = (req,res,next)=>{
    let i = 0;
    //voy recorriendo products y le voy asignando un id a medida que lo recorro
    products.forEach((item, i) => item.id = i+1)
    next()
}

//exporto este modulo para utilizarlo por fuera de este archivo
module.exports=createId