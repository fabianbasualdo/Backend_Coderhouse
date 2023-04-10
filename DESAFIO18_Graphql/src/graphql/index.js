import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { PersonsController } from "./controller/persons.controller.js";



/********************indicamos que usaremos Queries para consulta******************* */
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    ...PersonsController.queries, //controller contiene los metodos del DAO, indico que sera de tipo queries (es decir solo para consultar)
  },
});
/*****************indicamos que usaremos Mutations para modificar******************* */
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    ...PersonsController.mutations,//controller contiene los metodos del DAO, indico que sera de tipo mutations( es decir para modificar)
  },
});
/************************************************************************************ */

/*************lo que indicamos arriba lo colocamos en schema************************ */
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

/********************************************************************************** */
export { schema }; //exportamos schema
