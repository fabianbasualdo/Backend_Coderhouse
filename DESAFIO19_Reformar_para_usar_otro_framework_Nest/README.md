
## Explicacion sobre el funcionamiento del framework llamado nest:

> PASO 1:

La carpeta interfaces/ contiene los archivos de tipo entity.js que son el modelo que contiene el nombre de cada campo y tipos de datos que tendra mi tabla. Por cada tabla en mi base de datos habra un archivo js del tipo entidad.

> PASO 2: 

Archivo de tipo services.js
aqui se encuentran todos los metodos que me permiten
buscar, borrar, dar de alta, etc.
estos conectan con el DTO para validar los campos y su tipo de datos

> PASO 3:

Los archivos de tipo controller.ts contienen los endpoint que voy a utilizar, siendo el 
enpoint raiz el que indico en @controller('productos') 
luego puedo colocar como sigue la ruta del endpoint de la siguiente manera utilizando @POST,@GET,@PUT,@DELETE:

@POST('register')
@GET(':id') de esta manera el framework entiende que el endpoint vendra con un parametro.



> Ejemplo que no es de este proyecto lo coloco solo a modo didactico:
findUserByID(@Param('id') id:string{} 
//@Param('id') de esta manera entro al objeto que traigo de la base de datos y obtengo el id del objeto.



> Ejemplo de un endpoint de tipo PUT que no es de este proyecto lo coloco solo a modo didactico:
@Put('edit/:id') 
public async updateUser(
@Param('id') id:string,
@Body() body:UserUpdateDTO,
){
return await this.userService.updateUser(body,id)
}
}



# explicacion:

Ejemplo de un Put que no es de este proyecto lo coloco solo a modo didactico:
> Por parametro este enpoint localhost:3000/productos/edit/id recibe el id que voy a editar,
y por @body recibe todos los datos que editare.
luego al metodo updateUser le pasa ambos parametros para actualizar la base.

Este archivo conecta con los archivos de tipo service.ts



# resumen 
los archivos de tipo controller.ts utiliza los metodos de los archivos de tipo servicios.ts.
controller.ts son los endpoint que utilizara mi soft



# Forma de utilizar el software

> PASO 4:
> npm start 

> PASO 5:
> Abrir Postman 

> Insertar un nuevo registro
## Postman
> POST:
> localhost:3000/productos
> send

> {
>  "title": "hola2",
>   "price": 26,
>   "thumbnail": "http://www.imagen2.jpg"
> }

> PASO 6:

> Consultar lo insertado anteriormente con un GET

> localhost:3000/productos



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

# e2e tests
$ npm run test:e2e





