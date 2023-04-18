import { Producto } from 'src/productos/interfaces/producto.interface';
export declare class ProductosService {
    private readonly producto;
    getAll(): Producto[];
    save(producto: Producto): void;
    delete(): Producto[];
    update(id: any, producto: Producto): Producto[];
}
