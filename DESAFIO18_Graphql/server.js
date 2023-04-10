import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/graphql/index.js";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
server.on("error", (error) =>
  console.error("Servidor express con error: ", error)
);
