"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
let ProductosService = class ProductosService {
    constructor() {
        this.producto = [];
    }
    getAll() {
        return this.producto;
    }
    save(producto) {
        let id = this.producto.length + 1;
        let nuevoProducto = Object.assign(Object.assign({}, producto), { id: id });
        this.producto.push(nuevoProducto);
    }
    delete() {
        let productosABorrar = this.producto;
        productosABorrar.splice(0, productosABorrar.length);
        return this.producto;
    }
    update(id, producto) {
        let productIndex = this.producto.findIndex((product => product.id === parseInt(id)));
        let productUpdated = Object.assign(Object.assign({}, producto), { id: productIndex + 1 });
        this.producto[productIndex] = productUpdated;
        return this.producto;
    }
};
ProductosService = __decorate([
    (0, common_1.Injectable)()
], ProductosService);
exports.ProductosService = ProductosService;
//# sourceMappingURL=productos.service.js.map