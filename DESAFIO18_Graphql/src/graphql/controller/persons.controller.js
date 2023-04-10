
/***********importo los tipos de datos que usare de GraphQL*****************/
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";


import PersonasDaoMem from "../../dao/PersonasDaoMem.js";
import { PersonType } from "../types/Persons.js";



const personasDaoMem = new PersonasDaoMem();


/**************************BUSCO TODAS LAS PERSONAS*************************** */
const getPersons = {
  type: new GraphQLList(PersonType), //indicamos a GraphQL con PersonType que viene de person.js los tipos de datos y los campos que usaremos.
  description: "Obtener personas",
  resolve: async () => {
    const personas = personasDaoMem.getAll(); //llamo a getAll del DAO para traer toda la lista.
    return personas;
  },
};
/******************************BUSCO POR ID********************************* */
const personById = {
  type: PersonType,
  args: {
    id: { type: GraphQLID },//le indico a GraphQL que el tipo de datos que tiene que ingresar es id de tipo integer.
  },
  resolve: async (_, { id }) => {
    const person = personasDaoMem.getById(id); //traigo la persona por id
    console.log(person);
    return person;
  },
};

/**************************ACTUALIZO LAS PERSONA***************************** */
const putPerson = {
  type: PersonType,
  args: {
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    dni: { type: GraphQLString },
    edad: { type: GraphQLInt },
  },
  resolve: async (_, { id, nombre, apellido, dni, edad }) => {
    const result = personasDaoMem.updateById(id, {
      nombre,
      apellido,
      dni,
      edad,
    });
    return result;
  },
};

/***************************BORRO A LA PERSONA****************************** */
const delPerson = {
  type: PersonType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }) => {
    const deleted = personasDaoMem.deleteById(id); //llamamos al metodo para borrar
    return deleted;
  },
};

/***********************************INGRESO LA PERSONA********************** */
const postPerson = {
  type: PersonType,

  //indico a graphQL los campos con el tipo de datos permitido que debe ingresar el cliente
  args: {
    nombre: { type: new GraphQLNonNull(GraphQLString) },
    apellido: { type: new GraphQLNonNull(GraphQLString) },
    dni: { type: new GraphQLNonNull(GraphQLString) },
    edad: { type: new GraphQLNonNull(GraphQLInt) },
  },


  resolve: async (_, { nombre, apellido, dni, edad }) => {
    //guardo en el array
    const added = personasDaoMem.save({
      nombre,
      apellido,
      dni,
      edad,
    });
    return added;
  },
};

/****************************************************************************** */

//exportamos controller indicandole los metodos agrupados por mutations y queries
const PersonsController = {
  mutations: {
    postPerson,
    putPerson,
    delPerson,
  },
  queries: {
    getPersons,
    personById,
  },
};
/****************************************************************************** */
export { PersonsController };
