//CAMBIAR PARA SER ADMIN
const userAdmin = true;

const adminChecker = (req, res, next) => {


    //const userAdmin = req.params.userAdmin


    if (userAdmin) {
        next()
    } else {
        res.send({ error: -1, descripcion: `Ruta ${req.path} ,Método ${req.method} no AUTORIZADA` })
    }
}

module.exports = { adminChecker }