const express = require('express')

const apiRoutes = require('./routes/indexRoutes')

const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* La ruta en la url empezara en /api mas lo que configure en el archivo apiRoutes que viene del archivo llamado indexRoutes */
app.use('/api', apiRoutes)


//Routers
//si el usuario coloca en la url solo la raiz, lo redireccionara a /api/products
app.get('/', (req, res) => {
    res.redirect('/api/products')
})


//inicia la conexion del servidor en el puerto 8080 o en el indicado en process.env.PORT
const connected = app.listen(PORT, () => {
    console.log(`Servidor activo y corriendo en puerto ${PORT}`)
})


//si hay un error en la conexion envira un error en la consola.
connected.on('error', (error) => {
    console.error('Error: ', error)
})