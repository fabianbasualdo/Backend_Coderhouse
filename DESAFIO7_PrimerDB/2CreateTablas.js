const config = require("./db/config");
const knexLib = require("knex");

//Este scripts lo utilizo para crear la tabla products en mysql y messages en sqlite3

(async() => {
  const knex = knexLib(config.mariaDB);
  try {
    const result = await knex.schema.hasTable("products");
    if(!result) {
      await knex.schema.createTable("products", table => {
        table.increments('id');
        table.string('name').notNullable().defaultTo('fulano');
        table.integer('price').notNullable();
        table.string('image').notNullable();
      });
      console.log("Products tabla creada");
    } else console.error("skipping creation...");
  }
  catch(err) { console.error(err); }
  finally { knex.destroy(); }
})();




(async() => {
  const knex = knexLib(config.sqlite);
  try {
    const result = await knex.schema.hasTable("messages");
    if(!result) {
      await knex.schema.createTable("messages", table => {
        table.string("id").notNullable();
        table.string("email").notNullable();
        table.string("text").notNullable();
        table.string("time").notNullable();
      });
      console.log("Messages tabla creada.");
    } else console.error("skipping creation...");
  }
  catch(err) { console.error(err); }
  finally { knex.destroy(); }
})();