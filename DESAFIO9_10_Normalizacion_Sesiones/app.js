const express = require("express");
const session = require("express-session");

const expbs = require("express-handlebars");

require("dotenv").config({ path: "./config/.env" });/*aqui colocaremos las variables de entorno, como por ejemplo la conexion a mongo, y el puerto*/


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


const path = require("path");

const routes = require("./routers/index");// en routers/index tenemos todas las rutas

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


/*      PERSISTENCIA POR MONGO ATLAS     */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* ------------------------------------- */

//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOATLAS,
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views/layouts"));

app.use("/", routes);//a partir del raiz, podremos acceder a todas las rutas que haya en routes

//Motor de plantillas
app.engine(
  "hbs",
  expbs.engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

/* CHAT */
const ApiChat = require("./api/apiChat");

//apiChat tiene metodos para normalizar y desnormalizar desde el archivo chat.json
const apiChat = new ApiChat();//creo el objeto

//creo un array para guardar los mensajes del chat
let messages = [];

io.on("connection", async (socket) => {

  //traigo el contenido de /data/chat.json utilizando apiChat.js
  let messagesToEmit = await apiChat.readChatFromFile();

  //si el array tiene datos lo borra, porque voy a guardar los mensajes del Archivo chat.json
  messages.splice(0, messages.length);

  //inserta en el array llamado menssages lo que encuentra en el archivo /data/chat.json
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  //envia el contenido de /data/chat.json por medio de sockect hacia el socket que lo requiera

  //En este caso lo recibira en layouts/index.js utilizando un socket.on("messages")
  socket.emit("messages", messagesToEmit);


  /*por medio de socket recibe un nuevo mensaje, (el cual contiene del author su id,name,lastname,age,alias,avatar) llamado new-message que viene desde el index.js de la carpeta layouts*/
  socket.on("new-message", (data) => {
    /*cuenta cuantos mensajes tiene en el array llamado messages y le suma uno, porque esta buscando el id que le colocara al nuevo mensaje que vino por el socket.*/
    data.id = messages.length+1

    //inserta el nuevo mensaje con su id incorporado al array messages
    messages.push(data);

    /*envia por socket el nuevo mensaje incorporado, lo recibira index.js de la carpeta layouts el cual dibujara en pantalla el alias, time, text*/
    io.sockets.emit("messages", [data]);

    //por medio de apiChat escribe el archivo /data/chat.json con el contenido del chat.
    apiChat.writeChatToFile(messages);
  });
});




//Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});

//Server
httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});
