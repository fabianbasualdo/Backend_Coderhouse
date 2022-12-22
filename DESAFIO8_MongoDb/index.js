const db = connect('mongodb://localhost/ecommerce')
//db.Almacen.insertMany(parsedData)

// 1) Crear la BD 'ecommerce' con las colecciones 'mensajes' y 'productos' y agregar 10 pruductos distintos a cada uno.
//use ecommerce

db.createCollection('mensajes')
db.createCollection('productos')

const messagesData = [
    {
        id:1,
        email:"automatico@gmail.com",
        text:"Hola",
        time: "Thursday at 7:00 AM"
    },
    {
        id:2,
        email:"fabian.basualdo@gmail.com",
        text:"Hola,Como andas?",
        time: "Thursday at 7:00 AM"
    },
    {
        id:3,
        email:"automatico@gmail.com",
        text:"Tomando un te, y vos?",
        time: "Thursday at 7:00 AM"
    },
    {
        id:4,
        email:"fabian.basualdo@gmail.com",
        text:"tomando un cafe",
        time: "Thursday at 7:00 AM"
    },
    {
        id:5,
        email:"automatico@gmail.com",
        text:"como va tu dia?",
        time: "Thursday at 7:00 AM"
    },
    {
        id:6,
        email:"fabian.basualdo@gmail.com",
        text:"mi dia va bien",
        time: "Thursday at 7:00 AM"
    },
    {
        id:7,
        email:"automatico@gmail.com",
        text:"se viene enero queremos vacaciones",
        time: "Thursday at 7:00 AM"
    },
    {
        id:8,
        email:"fabian.basualdo@gmail.com",
        text:"y la verdad que si.",
        time: "Thursday at 7:00 AM"
    },
    {
        id:9,
        email:"automatico@gmail.com",
        text:"mal que coder no para en enero",
        time: "Thursday at 7:00 AM"
    },
    {
        id:10,
        email:"fabian.basualdo@gmail.com",
        text:"yo me voy igual de vacaciones unos dias.",
        time: "Thursday at 7:00 AM"
    }
]
const productsData = [
 {
    id: 1,
    code: 1,
    timestamp: 1671706507,
    name: "soda manaos",
    desc: "con gas",
    price: 5000,
    image: "https://www.manaos.com/sodamanaos.jpg",
    stock: 5
 },
 {
    id: 2,
    code: 2,
    timestamp: 1671706507,
    name: "manaos cola",
    desc: "contiene mucha azucar",
    price: 4500,
    image: "https://www.manaos.com/manaoscola.jpg",
    stock: 10
 },
 {
    id: 3,
    code: 3,
    timestamp: 1671706507,
    name: "vino santa filomena",
    desc: "contiene un poco de uva",
    price: 4300,
    image: "https://www.manaos.com/vinosantafilomena.jpg",
    stock: 10
 },
 {
    id: 4,
    code: 4,
    timestamp: 1671706507,
    name: "vino alma mora",
    desc: "de buena tierra",
    price: 4000,
    image: "https://www.manaos.com/vinosalmamora.jpg",
    stock: 5
 },
 {
    id: 5,
    code: 5,
    timestamp: 1671706507,
    name: "vino termidor",
    desc: "contiene amor",
    price: 1500,
    image: "https://www.vinos.com/termidor.jpg",
    stock: 20
 },
 {
    id: 6,
    code: 6,
    timestamp: 1671706507,
    name: "fernandito doble",
    desc: "vino con cola",
    price: 3800,
    image: "https://www.manaos.com/fernandito.jpg",
    stock: 14
 },
 {
    id: 7,
    code: 7,
    timestamp: 1671706507,
    name: "coca cola",
    desc: "el sabor del encuentro",
    price: 3500,
    image: "https://www.cocacola.com/coca.jpg",
    stock: 4
 },
 {
    id: 8,
    code: 8,
    timestamp: 1671706507,
    name: "sevenup",
    desc: "refrescante",
    price: 3000,
    image: "http://www.sevenup.com/sevenup.jpg",
    stock: 3
 },
 {
    id: 9,
    code: 9,
    timestamp: 1671706507,
    name: "pepsi",
    desc: "pepsi azucarada",
    price: 1000,
    image: "https://www.pepsi.com/pepsi.jpg",
    stock: 44
 },
 {
    id: 10,
    code: 10,
    timestamp: 1671706507,
    name: "fernet",
    desc: "es tradicion en cordoba argentina",
    price: 2000,
    image: "https://www.fernet.com/fernet.jpg",
    stock: 1
 },
]

db.mensajes.insertMany(messagesData)
db.productos.insertMany(productsData)

db.mensajes.find()
db.productos.find()

// contar el número de registros que tengo en una colección
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

db.productos.insertOne({
    id: 11,
    code: 11,
    timestamp: 1671706507,
    name: "lata coca",
    desc: "refresco con azucar",
    price: 2600,
    image: "https://www.latacoca.com/latacoca.jpg",
    stock: 7
 })


db.productos.find({"price": {$lt: 1000}})

//listar los productos con precio entre los 1000 a 3000 pesos
//gte es mayor igual a 1000
//lte es menor igual a 3000
 db.productos.find({price:{$gte:1000,$lte:3000}})
 
 //listar los productos con precio mayor a 3000 pesos
 //gt es mayor a 3000
 db.productos.find({price:{$gt:3000}})
 
 //realizar una consulta que traiga solo el nombre del tercer producto mas barato
 //db.productos.find().skip(2).limit(1).sort({price:1});
 db.productos.find({}, {"name":1, "_id": 0}).skip(2).sort({"price": 1}).limit(1);
/*
hacer una actualizacion sobre todos los productos, agregando el 
campo stock a todos ellos con un valor de 100
*/
db.productos.updateMany({}, {$set:{stock:100}})

//cambiar el stock a cero de los productos con precio mayores a 4000 pesos
db.productos.updateMany({price:{$gt:4000}},{$set:{stock:0}})

//borrar los productos con precio menor a 1000 pesos
db.productos.deleteMany({price:{$lt:1000}})

//crear un usuario pepe con clave asd456 que solo pueda leer la base de datos ecommerce 
//verificar que pepe no pueda cambiar la informacion
db.createUser({
    user:"pepe",
    pwd:"asd456",
    roles:[{role:"read", db:"ecommerce"}]
})

//VERIFICACION DE ROL "LECTURA"

// mongosh --port 27017  --authenticationDatabase "pepe" -u "ecommerce"
//use ecommerce

db.productos.find()