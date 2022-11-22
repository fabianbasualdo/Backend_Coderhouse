const express = require('express')
//const path = require('path')
const PORT = process.env.PORT || 8080;

//inicializo express
const app = express();

//Traigo el archivo productos.router que tiene todos los enpoint
const productsRoute = require('./router/productos.route')

//las carpetas que le asigno a express.static, podre acceder a su contenido desde el navegador
app.use(express.static('views'))

//le indico a express que utilizare json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


////Le indico a express el directorio donde se encuentran los archivos de plantilla
app.set('views', './views/')
//Le indico a express el motor de plantilla que se utiliza
app.set('view engine', 'pug')


//LO PRIMERO QUE LEE CUANDO LEVANTA ES: index.js, este archivo al detectar raiz en la url levanta form.pug
//le indico que la raiz sera form.pug que se encuentra en la carpeta views
//por eso al colocar en el navegador localhost:8080 me mostrara la vista de form.pug
app.get('/', (req,res)=>{
    res.render('form.pug')
})


/*para poder acceder al archivo "productos.router.js" que es el que tiene todos los endpoint, debo colocar en la url lo siguiente: /products/"el endpoint que quiero llamar" del mencionado archivo.
ejemplo: localhost:8080/products/3 , esto me traera el productos con id 3.
*/
app.use('/products', productsRoute)



//conecto el servidor en el PORT =8080
const connected = app.listen(PORT, ()=>{
    console.log("API Restful running...")
})


//si hay un error en la coneccion tira error
connected.on('error', (error)=>{
    console.error('Error: ', error)
})