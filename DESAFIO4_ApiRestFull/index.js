const express = require("express")
const apiRoutes = require('./router/indexRoutes')

const app = express();
const PORT = process.env.PORT || 8080

//el formato a utilizar sera json
app.use(express.json())

//le indico a express que el index.html lo lea desde la carpeta public
app.use(express.static('public'))





/*esta sera la ruta raiz del proyecto, le asocio apiRoutes, el cual inicializa el router, agregando 
/products como ruta raiz, quedando la ruta raiz como /api/products */
app.use('/api', apiRoutes)


//inicializo el proyecto en el puerto 8080
const connected = app.listen(PORT, ()=>{
    console.log("API Restful running...")
})

connected.on('error', (error)=>{
    console.error('Error: ', error)
})