
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";


//definimos los tipos de datos que usaremos
const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "Person Type",

  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    dni: { type: GraphQLString },
    edad: { type: GraphQLInt },
  }),

});

export { PersonType };
