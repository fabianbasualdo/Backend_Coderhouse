const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
require("dotenv").config({ path: ".env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("./routers/index.js");
const { minimistObject } = require("./utils/minimisObject")

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// PERSISTENCIA MONGO ATLAS
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// SESSION
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

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));
app.use("/", routes);

// MOTOR PLANTILLAS
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

// CHAT
const ApiChat = require("./api/apiChat.js");
const apiChat = new ApiChat();
let messages = [];

io.on("connection", async (socket) => {
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length + 1;
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });
});

// ERRORES
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});

// SERVIDOR
const PORT = parseInt(process.argv[2]) || 8080;

httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${httpServer.address().port}`
  );
});
