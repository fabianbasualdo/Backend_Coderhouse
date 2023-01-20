const server = require("express").Router();


//cuando detecta el endpoint get /login cargar login.hbs
server.get("/login", (req, res) => {
  return res.render("login.hbs");
});



server.post("/login", (req, res) => {
  //carga el nombre que el usuario coloco en el body
  let username = req.body.name;

//carga la sesion con el nombre de usuario ingresado
  req.session.user = username;

  //redireccion a productos.hbs
  return res.redirect("productos");
});



//al detectar el /logout destruye la sesion
server.get("/logout", (req, res) => {

  req.session.destroy((err) => {
    if (!err) {
      res.render("bye_banner.hbs");
    } else res.send({ status: "Logout ERROR", body: err });
  });
});

module.exports = server