#  REFORMAR PARA USAR GRAPHQL

## Consigna
- En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. 
- Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
- Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.


## Uso


3. Parado en la raíz del proyecto, corré el siguiente comando para ejecutar la API.

```
npm start
```

4. Luego ingresá a http://localhost:8080/graphql y comenzá a ejecutar las _queries(getPersons, personById)_ y _mutations (postPerson, putPerson, delPerson)_.

## Capturas de Pantalla de Ejecución

Ejecuto la _mutation postPerson_ para agregar persona.

<img src="./img/1_mutation_PostPerson.JPG">

Ejecuto la _query getPersons_ para mostrar todas las personas.

<img src="./img/2_Query_getPersons.JPG">

Ejecuto la _mutation postPerson_ para agregar persona.

<img src="./img/3_mutation_PostPerson.JPG">

Ejecuto la _query getPersons_ para mostrar todas las personas.
<img src="./img/4_Query_getPersons.JPG">

Ejecuto la _query personByid_ para mostrar la persona por el identificador.
<img src="./img/5_Query_personById.JPG">



