//=========== MODULOS ===========//

//inicializo express
const express = require('express');
const Contenedor = require("../managers/contenedor");
//=========== ROUTER ===========//

//inicializo router
const router = express.Router();


//=========== MIDDLEWARE ===========//

//indico a express que recibira un json
router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.use((req, res, next) => {
  console.log(`productos.route.js, router:Product Middleware, Time: ${Date.now()}`)
  next()
});


//=========== CONTENEDOR ===========//

//cargo el archivo json en products
let products = new Contenedor("../data/data.json");

//=========== RUTAS ===========//
/*********************************************************************** */ 

router.get('/', async (req, res, next) => {
  //Cuando coloco en la url la raiz, ejecuto el archivo formNewProduct.handlebars
  res.render('formNewProduct');
});


/*********************************************************************** */ 
router.get("/products", async (req, res, next) => {
  try {
    //recordemos que products tiene cargado el json con los datos
    const arrayProduct = await products
      .getAll() 
      //getAll() es un metodo del archivo contenedor.js que lee y trae el archivo json
      .then((resolve) => resolve);
    if (arrayProduct.length === 0) {
      throw new Error("No hay products");
    }
    //cuando la promesa me devuelve el contenido del json en arrayProducts ejecuto res.render
    //Cuando ejecuto en la url /products, le paso el json a el archivo datos.handlebars
    res.render('datos', {arrayProduct});
  } catch (err) {
    next(err);
  }
});


/*********************************************************************** */ 
router.get("/products/:id", async (req, res, next) => {
  try {
    const producto = await products
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

/*********************************************************************** */ 
router.post("/products", async (req, res, next) => {
  try {


    //El nombre solo puede contener letras, números y espacios
    const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;


    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Debes enviar un producto con nombre, precio y URL");
    }
    if (req.body.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    //Si la busqueda falla, el método exec() devuelve null
    //captura lo que el usuario coloca en title y lo compara con el patron.
    if (!nombresValidos.exec(req.body.title)) {
      //captura el error
      throw new Error('El nombre solo puede contener letras, números y espacios');
    }
    //guarda lo que el usuario ingreso en el body con el metodo save de productos.route.js
    await products.save(req.body).then((resolve) => {
      //redirecciona a la raiz
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
});

/*********************************************************************** */ 
router.put("/products/:id", async (req, res, next) => {
  try {
    const producto = await products
      .getById(Number(req.params.id))
      .then((res) => res);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await products
      .update(
        Number(req.params.id),
        req.body.title,
        req.body.price,
        req.body.thumbnail
      )
      .then((resolve) => {
        res.json(resolve);
      });
  } catch (err) {
    next(err);
  }
});

/*********************************************************************** */ 

router.delete("/products/:id", async (req, res, next) => {
  try {
    const producto = await products
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await products.deleteById(Number(req.params.id)).then((resolve) => {
      res.json(`${producto.title} se borro con éxito`);
    });
  } catch (err) {
    next(err);
  }
});
/*********************************************************************** */ 


//=========== handleErrors ===========//
function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ error: err.message });
}


router.use(handleErrors);

module.exports = router;

















//=========== handleErrors ===========//
function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ error: err.message });
}
router.use(handleErrors);

module.exports = router;
