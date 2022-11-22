//=========== MODULOS ===========//
//inicializo express
const express = require('express');

//llamo al archivo de route
const apiProducts = require('./routes/productos.route');

//inicializo el modulo de archivos
const fs = require('fs');

//inicializo handlebars
const handlebars = require('express-handlebars');

//modulo para definir rutas que viene al instalar node.js
const path = require('path');

//=========== ROUTERS ===========//
const app = express();

//=========== MIDDLEWARES ===========//
//le indico a express que recibira un json
app.use(express.urlencoded({extended:true}));
app.use(express.json());


/* a la raiz que usare por defecto, le adjunto los endpoint del router, llamado apiProducts el cual contiene al archivo de router llamado productos.router.js*/
app.use('/', apiProducts);


//app.use('/', express.static(__dirname+'/public'))


app.use((req, res, next) => {
    console.log(`index.js, express:Product Middleware , Time: ${Date.now()}`)
    next()
})

app.use(function (err, req, res, next) {
    console.error( err)
    res.status(500).send("algo esta mal!")
})

//=========== MOTOR DE PLANTILLAS ===========//

//Le indico a express en que ruta estan las plantillas
app.set('views', path.join(__dirname, 'views'));


//Le indico a express que usare handlebars y que ejecutare main.handlebars por default
//le indico a express en que ruta estaran los layouts
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));
//con path.join armo la ruta donde estan los layouts es decir armo: /views/layouts

//seteo que el motor a utilizar sera handlebars
app.set('view engine', 'handlebars');

//=========== SERVER ===========//
const PORT = 8080;

//el servidor escuchara en el puerto 8080
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));