const { fork } = require("child_process");
const server = require("express").Router();

// INFO
server.get("/info", (req, res) => {
  if (req.session.user) {
    const args =
      process.argv.length > 2 ? process.argv.slice(2).join(" → ") : "Ninguno";

    res.send(`
              <h2>Información con Process</h2>
                <ul>
                  <li>Argumentos de entrada: ${args}</li>
                  <li>Sistema operativo: ${process.platform}</li>
                  <li>Versión de node.js: ${process.version}</li>
                  <li>Memoria total reservada: ${`${Math.round(
                    process.memoryUsage().rss / 1024
                  )} KB`}</li>
                  <li>Path de ejecución: ${process.execPath}</li>
                  <li>Process id: ${process.pid}</li>
                  <li>Carpeta del proyecto: ${process.cwd()}</li>
                  <li>Número de Procesadores: ${require('os').cpus().length}</li>
                </ul>
              <a class="btn btn-primary" href="/productos" >Volver</a>
            `);
  } else return res.redirect("login");
});

// RANDOMS
server.get("/randoms", (req, res) => {
  if (req.session.user) {
    const cant = parseInt(req.query.cant) || 10000;
    const computo = fork("../DESAFIO13_Servidor_con_balance_de_carga/utils/randoms.js");
    computo.send(cant);
    computo.on("message", (result) => {
      res.render("../views/partials/randoms.hbs", {
        numeros: JSON.stringify(result),
      });
    });
  } else return res.redirect("login");
});

module.exports = server;
