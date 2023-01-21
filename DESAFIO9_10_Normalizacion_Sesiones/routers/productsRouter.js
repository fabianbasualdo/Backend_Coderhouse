const server = require("express").Router();



const path = require('path')
const Contenedor = require("../class/contenedor");

/*carga el constructor de la clase Contenedor con el archivo productos.json, con esto contenedor ya puede trabajar con el CRUD*/
const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));

server.get("/", (req, res) => {
//si exite una sesion, que la sesion es iniciada en sessionRouter.js(es decir: /login) entonces:
  if (req.session.user) {
    let content = productos.content;//contiene los productos encontrados en productos.json
    let boolean = content.length !== 0; //si es distinto de cero es porque tiene contenido
    
    return res.render("index.hbs", {
      //index.hbs carga en pantalla a welcome.hbs,form.hbs,products.hbs
      /*cuando ingresa a products.hbs entra a un if preguntando si showList es true, si es true, entonces renderiza (dibuja en pantalla) el contenido de list (todo lo que traje de productos.json)
      name la utiliza welcome.hbs para renderizar,para saludar al usuario*/
      list: content, //contenido encontrado
      showList: boolean, //true si tiene contenido
      name: req.session.user, //usuario que inicio la sesion
    });
  } else return res.redirect("login");//de lo contrario si no hay una sesion redirecciona a login.hbs
});



server.post("/", (req, res) => {
  //si existe una sesion
  if (req.session.user) {
    /*guarda lo que ingrese en el body al archivo productos.json utilizando el objeto de la clase contenedor*/
    productos.save(req.body);

    let content = productos.content; //contenido del archivo productos.json
    let boolean = content.length !== 0; //si es distinto a cero es porque tiene contenido

    return res.render("index.hbs", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login"); //si no existe sesion lo redirecciona a login.hbs
});

module.exports = server;
