> nodemailer.js : colocar tu user y password para conectarte a Gmail desde tu app

> .env: completar los datos para conectarte a TWILIO y a tu base de datos de mongoAtlas

> whatsapp.js : colocar el numero que te proporciono TWILIO

> dbConfig.js : aqui se encuentra el connectoTo para conectarse a la base de datos

# PASO 1
Por medio de POSTMAN insertar en la tabla productos una serie de articulos para vender, con el siguiente formato, a la siguiente ruta:

> POST http://localhost:8080/products

> {
>     "id": 1,

>    "code": 1,

>   "timestamp": 1678845527,

>   "name": "Fodera Victor Wooten's Bass",

>   "desc": "Best Bass of the Best Bass  Player of History",

> "price": 50000,

> "image": "https://i.pinimg.com/originals/db/fd/47/dbfd47befdbe252c27daa07e5275acd3.jpg",

> "stock": 5
},

# PASO 2: 

Registrarse como nuevo usuario, como administrador te llegara un mails con los datos de la persona que se registro

# PASO 3:
Agregar al carrito los productos a comprar, presionando el boton agregar

# PASO 4:
Una vez agregado al carrito podes presionar el boton llamado finalizar compra.

Al finalizar la compra como administrador te llegara un mails con el detalle de la compra concretada

El nuevo carrito sera creado al momento de  loguearse.

tanto el logueo, el carrito, y sus productos seran guardados en la base de datos.

