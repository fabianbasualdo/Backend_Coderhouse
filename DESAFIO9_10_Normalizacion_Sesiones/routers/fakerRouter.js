const server = require("express").Router();

//apiProductos hereda de la clase contenedor, que es la que hace el CRUD
const ApiProductos = require("../api/apiProductos.js");

//creo el objeto que contiene el metodo productos, para generar el faker con los 5 elementos.
const apiProductos = new ApiProductos();

//al detectar el endpoint /productos-test genera los 5 productos por faker y los renderiza
server.get("/productos-test", (req, res) => {
    const result = apiProductos.productos();
    return res.render("index.hbs", {
      list: result,
      showList: true,
      name: req.session.user,
    });
});

module.exports = server;