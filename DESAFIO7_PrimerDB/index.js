const express = require('express')
const Contenedor = require('./contenedor/contenedor')

const http = require('http')
const socketIO = require('socket.io')

const app = express();
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

const path = require('path')
const moment = require('moment')
const {engine} = require('express-handlebars')

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'))

app.engine('hbs', engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:path.resolve(__dirname,"./views/layouts"),
    partialDir:path.resolve(__dirname, "./views/partials")
}))
app.set('views', './views/')
app.set('view engine', 'hbs')


app.get('/', (req,res)=>{
    res.render('index', {products})
})

httpServer.listen(PORT, ()=>{
    console.log("Running...")
})

// DB
const dbConfig = require('./db/config.js')


//creo el objeto, utilizando la clase contenedor el cual me permite realizar el CRUD a la tabla message de sqlite3 y products de mysql
const allMessages = new Contenedor(dbConfig.sqlite, 'messages')
const products = new Contenedor(dbConfig.mariaDB, 'products')
//con estos objetos accedere a los metodos para hacer el CRUD

//con socket.emit envio la informacion
//con socket.on recibo la informacion
const users = []

function formatMessage(id, email, text){
    return {
      id,
      email,
      text,
      time: moment().calendar().toString()
    }
  }
io.on('connection',async socket=>{
    console.log('Nuevo cliente conectado')
    // Websockets - Tabla
    const allProducts = await products.readFile()
    socket.emit('allProducts', allProducts)

    socket.on('new-product', async newProduct=>{
        await products.writeFile(newProduct)
        io.emit('render-new-product', newProduct)
    })
    
    // Websockets - Chat
    const botName = 'Automatico'
    socket.on('newEmail',async(email)=>{
        const newUser = {
            id : socket.id,
            email
          }
        users.push(newUser)
		
		//el cliente mas nuevo recibe un mensaje de bienvenida
        socket.emit('newMessage', formatMessage(null,botName,'Bienvenido al Chat'))
		
		//y los demas clientes conectados reciben el mensaje sobre quien se unio.
		//broadcast.emit envia el mensaje a todos menos al que emite el mensaje.
        socket.broadcast.emit('newMessage', formatMessage(null, botName, `${email} se unió!`))

        const messages = await allMessages.readFile()
        socket.emit('allMessages', messages)
    })
    socket.on('updateNewMessage', async (text)=>{
        //users es el array donde estoy guardando los mensajes del chat
        const user = users.find(user => user.id === socket.id)
        const newMessage = formatMessage(socket.id, user.email, text)
        //utilizo el metodo para escribir en el archivo de Sqlite3
        await allMessages.writeFile(newMessage)
        io.emit('newMessage', newMessage)
    })
})  
