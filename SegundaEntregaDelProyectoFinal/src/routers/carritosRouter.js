import { Router } from "express";
import { carritosDao, productosDao } from "../daos/index.js";

const carritosRouter = Router();

carritosRouter.post("/", async (req, res) => {
    const carroAgregado = await carritosDao.guardar(req.body);
    res.json(carroAgregado);
});

carritosRouter.get("/", async (req, res) => {
    const carritos = await carritosDao.listarAll();
    res.json(carritos);
});

carritosRouter.get("/:id", async (req, res) => {
    const carrito = await carritosDao.listar(req.params.id);
    res.json(carrito.productos);
});

carritosRouter.delete("/:id", async (req, res) => {
    const carroEliminado = await carritosDao.borrar(req.params.id);
    res.json(carroEliminado);
});

export { carritosRouter };
