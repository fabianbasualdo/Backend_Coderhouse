const Contenedor = require('../../models/contenedor.js')
const path = require('path')

const dataPath = path.resolve(__dirname, "./carts.txt")

//le paso al constructor de Contenedor la ruta del carts.txt para que lea el archivo
const contenedor = new Contenedor(dataPath)

class CartsApi {

    //guardo en carts el contenido del archivo
    constructor() {
        //guardo en carts el contenido de carts.txt
        this.carts = (contenedor.data).then((res) => { this.carts = res })
    }



    static idCount = 0


    //crea el carrito con el id, la hora, y un array vacio para esperar a ser llenado.
    //es decir, al crear un id carrito, puedo asignarle bloques de productos con su id
    async createCart() {
        //let idCount = this.carts.length


        //entro al archivo para ver el maximo id carrito guardado que tengo
        let idCount = 0;
        Object.entries(this.carts).forEach(([id, value]) => {
            console.log(`El maximo id carrito almacenado es idcarrito: ${value.id}`)
            idCount = value.id
        });


        const newCart = {
            id: idCount + 1,
            timestamp: Date.now(),
            products: [],
        }

        //escribo el archivo carts.txt
        contenedor.writeFile(newCart)

        return { NewCart: `Tu nuevo Carro es el ${newCart.id}` }
    }


    //ingreso por parametro el id del carrito que quiero borrar
    async clearDelete(idCart) {
        //en carts tendre el contenido del archivo carts.txt
        const carts = await this.carts

        //con findIndex
        const index = carts.findIndex(cart => cart.id === +idCart)
        //console.log(`el indexcarrito es:${index}`)

        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCart}!` };
        const theCart = carts.find(cart => cart.id === +idCart)
        theCart.products = []

        carts.splice(index, 1)

        contenedor.writeAllFile(carts)

        return { success: `${theCart.id} fué eliminado.` }
    }



    showItems(idCart) {
        //muestra un carrito en base a el id de carrito indicado
        const theCart = this.carts.find(cart => cart.id === +idCart)
        if (!theCart) { return 'No existe el id del carrito buscado' }
        return { Productos: theCart.products }
    }



    async saveItem(idCart, product) {
        //guardo en carts el contenido del archivo llamado carts.txt
        const carts = await this.carts

        //busco dentro de carts el id del carrito buscado, y guardo su posicion dentro del archivo
        const index = carts.findIndex(cart => cart.id === +idCart)

        //pusheo el producto nuevo al carrito
        carts[index].products.push(product)
        //sobreescribo el archivo
        contenedor.writeAllFile(carts)
        return { message: `${product.name} a sido añadido al Cart` }
    }



    async deleteItem(idCart, idProduct) {
        //guardo el contenido de carts.txt en carts
        const carts = await this.carts

        //busco con find utilizando el id, el carrito
        const theCart = carts.find(cart => cart.id === +idCart)

        // guardo los productos del carrito en actualProducts
        const actualProducts = theCart.products
        //guardo el index donde se encuentra el producto buscado dentro del carrito
        const index = actualProducts.findIndex(product => product.id === +idProduct);


        if (index < 0) return {
            error: `No se encontró un Producto con el id: ${idProduct}!`
        };

        //guardo el name del producto que encontre
        const theProductName = actualProducts[index].name

        //utilizo el index encontrado para borrar el producto del carrito
        actualProducts.splice(index, 1)

        //sobreescribo el archivo
        contenedor.writeAllFile(carts)

        return { Success: `El producto: ${theProductName} fué eliminado de la lista` }
    }



}

module.exports = CartsApi