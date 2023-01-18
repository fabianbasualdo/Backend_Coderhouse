/*contenedor.js es el que conecta directamente con el archivo puro, contiene los metodos que hacen ABM directo en el archivo*/
const Contenedor = require('../../models/contenedor.js')

const path = require('path')

//dataPath es para obtener la ruta del archivo data.txt
const dataPath = path.resolve(__dirname, "./data.txt")


//El constructor de la clase Contenedor espera la ruta del archivo para leerlo.
const contenedor = new Contenedor(dataPath)

class ProductsApi {


    constructor() {
        //guardo en products el contenido que lei del archivo
        this.products = (contenedor.data).then((res) => { this.products = res })
    }



    getAll() {
        //como en el constructo ya tengo los productos en products, aqui simplemente lo retorno
        return this.products;
    };

    getById(id) {
        //utilizo find para buscar por id, dentro del products
        const product = this.products.find(prod => prod.id === +id);
        return product || { error: `el producto ${id} no fué encontrado!` };
    };

    saveNew(product) {

        /*products recordemos que contiene la totalidad del archivo de productos de data.txt por eso me fijo el length para saber su ultimo id, recordemos que cada producto esta separado en bloques, porque es un json*/
        let idCount = [...this.products].length

        //destructuro el contenido de product, que ingresa por el metodo saveNew
        //que es en realidad, todo lo que el usuario ingreso en el body completo
        const { name, desc, image, price } = product;

        if (!name || !desc || !image || !price) return { error: 'Todos los campos son obligatorios!' };

        //creo un array con product que ingresa como parametro de saveNew
        const newProduct = {
            id: idCount + 1,
            code: idCount + 1,
            timestamp: Date.now(),
            ...product
        };
        //escribo el archivo
        contenedor.writeFile(newProduct)

        return newProduct;
    };

    //actualizo el archivo con la nueva info, en funcion al id 
    async updateById(newInfo, id) {

        const newList = [...this.products]

        const index = this.products.findIndex(product => product.id === +id);

        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!` };
       
       
        newList[index] = {
            id: +id,
            code: +id,
            timestamp: Date.now(),
            ...newInfo
        };

        await contenedor.writeAllFile(newList)

        this.products = (contenedor.data).then((res) => { this.products = res })

        return newList[index]
    };


    //borro el archivo por el id
    deleteById(id) {
        const index = this.products.findIndex(product => product.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!` };
        const newList = this.products.splice(index, 1)
        contenedor.writeAllFile(newList)
        return newList
    };
}

module.exports = ProductsApi;