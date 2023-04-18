import { Injectable } from '@nestjs/common';
import { Producto } from 'src/productos/interfaces/producto.interface';

@Injectable()
export class ProductosService {

/***************************ARRAY************************************* */
  

private readonly producto: Producto[] =[];//iniciamos un array vacio con el modelo de datos
  

/***************************GETALL************************************* */
  getAll():Producto[] {
    return this.producto;
  }
  
/****************************SAVE************************************ */
  save(producto:Producto) {
    let id = this.producto.length + 1;
    let nuevoProducto = {...producto, id: id}
    this.producto.push(nuevoProducto);
  }
/****************************DELETE************************************ */
  delete():Producto[] {
    let productosABorrar = this.producto;
    productosABorrar.splice(0, productosABorrar.length);
    return this.producto;
  }


/**************************UPDATE************************************** */
  //ingresa el id que voy a editar en el objeto de tipo producto
  update(id, producto:Producto) {

    //guardo el producto encontrado en el array en productindex
    let productIndex = this.producto.findIndex((product => product.id === parseInt(id)));
    
    //agrego el producto actualizado al objeto
    let productUpdated = {...producto, id: productIndex+1}

    this.producto[productIndex] = productUpdated;//actualizo el array con el nuevo registro
    
    return this.producto; //retorno el nuevo producto
  }
}
/**************************************************************** */