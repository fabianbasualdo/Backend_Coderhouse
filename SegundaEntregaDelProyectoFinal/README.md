# importante
> Para que el software funcione debes agregar un archivo llamado config.js dentro del raiz de la carpeta llamada /src, dicho archivo tendra las claves para acceder a mongoAtlas y a firebase. Con el siguiente formato: 
>
>  export default {
>
>  fileSystem: {
>
>   path: "./data",
>
>  },
>
>  mongodb: {
>
>    cnxStr:"...",options: {
>
>      useNewUrlParser: true,
>
>      useUnifiedTopology: true,
>
>      serverSelectionTimeoutMS: 5000,
>
>    },
>
>  },
>
>  firebase: {...
>
>  },
>
>  };
>
> Los tres puntitos deben ser reemplazados por tu configuracion personal de mongoAtlas y de Firebase.

# Postman
> Recuerde que puede utilizar Postman

# archivo .env 
> configurar en el archivo llamado env la variable llamada PERS la cual indicara a que base de datos conectara para luego realizar el CRUD. para ver las opciones de conexion observar el archivo llamado index.js que se encuentra en la carpeta daos. por defecto PERS estara seteado con el valor memoria la cual trabajara en la Ram de la pc local.
# switch para conectar a la base de datos:
>
> El switch que determina a que base de datos conectara el sistema se encuentra en la carpeta daos, dentro del archivo llamado index.js

# Archivo Config.js
> contiene la informacion para conectarse a la base de datos seleccionada.

# Daos
>
> Todos los archivos dentro de la carpeta daos extienden a atributos y metodos que contienen los archivos de la carpeta contenedores.

# routers
> 
> Existe un conjunto de rutas tanto para carritos como para productos. A dichas rutas las llamamos Endpoint y las utilizamos para hacer CRUD

# ruta por inicial
>
> La ruta inicial es: http://localhost:8080/api/productos/

# Estructura para insertar un nuevo producto

>  {
>    "title": "string",
>
>    "price": number,
>
>    "thumbnail": "string"
>  }