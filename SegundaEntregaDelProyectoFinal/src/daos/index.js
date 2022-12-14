import dotenv from 'dotenv';

dotenv.config(
    {
        path: `../.env`
    }
);

let productosDao;
let carritosDao;

//recuerda configurar las claves de acceso a la base de datos en config.js, explicacion en README.md
switch (process.env.PERS) {
    //switch ("firebase") {
    //switch ("memoria") {
    case "json":
        const { default: ProductosDaoArchivo } = await import(
            "./productos/ProductosDaoArchivo.js"
        );
        const { default: CarritosDaoArchivo } = await import(
            "./carritos/CarritosDaoArchivo.js"
        );

        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
    case "firebase":
        
        const { default: ProductosDaoFirebase } = await import(
            "./productos/ProductosDaoFirebase.js"
        );
        const { default: CarritosDaoFirebase } = await import(
            "./carritos/CarritosDaoFirebase.js"
        );

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    case "mongodb":
        const { default: ProductosDaoMongoDb } = await import(
            "./productos/ProductosDaoMongoDb.js"
        );
        const { default: CarritosDaoMongoDb } = await import(
            "./carritos/CarritosDaoMongoDb.js"
        );

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break;
    default:
        const { default: ProductosDaoMem } = await import(
            "./productos/ProductosDaoMem.js"
        );
        const { default: CarritosDaoMem } = await import(
            "./carritos/CarritosDaoMem.js"
        );

        productosDao = new ProductosDaoMem();
        carritosDao = new CarritosDaoMem();
        break;
}

export { productosDao, carritosDao };