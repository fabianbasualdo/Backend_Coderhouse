import { ProductoDto } from './dto/producto.dto';
import { Producto } from 'src/productos/interfaces/producto.interface';
import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly ProductosService;
    constructor(ProductosService: ProductosService);
    save(saveProducts: ProductoDto): Promise<void>;
    getAll(): Promise<Producto[]>;
    delete(): Promise<Producto[]>;
    update(params: any, actualizarProducto: ProductoDto): Promise<void>;
}
