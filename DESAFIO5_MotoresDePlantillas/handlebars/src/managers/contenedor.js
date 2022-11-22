const fs = require("fs");

const pathToProducts = __dirname+'/../data/data.json'

class Contenedor {



  async getAll() {
    try {
      //lee el archivo json
      const contenido = await fs.promises.readFile(pathToProducts, "utf-8");

      //si el archivo no trajo contenido le escribo un []
      if (!contenido) {
        const productos = [];
        fs.writeFileSync(pathToProducts, JSON.stringify(productos));
        //retorno productos y termino la ejecucion
        return productos;
      }

      //si el archivo contiene datos lo parsea
      const datos = JSON.parse(contenido);
      //retorna el contenido del archivo y termina la ejecucion
      return datos;
    } catch (error) {
      throw error;
    }
  }



  async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)

        .catch((err) => {
          throw err;
        });

      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }



  async save(obj) {
    try {
      //getAll lee el json y se lo asigno array
      const array = await this.getAll()
        .then((res) => res)

        .catch((error) => {
          throw error;
        });

      //si el array contiene datos entro al if
      if (array.length <= 0) {
        //le coloco un id al objeto nuevo que ingreso en save
        obj.id = 1;
        //pusheo(inserto) en array el nuevo objeto ingresa en save
        array.push(obj);

        //convierto el contenido del array y lo guardo en data
        const data = JSON.stringify(array);

        //escribo el archivo json con el contenido nuevo
        fs.writeFileSync(pathToProducts, data, "utf-8");

        //retorno el id nuevo y termino la ejecucion de save
        return obj.id;
      }

      //si el array no contiene datos pushea el objeto y lo guarda en el archivo 
      obj.id = array.length + 1;
      array.push(obj);
      const data = JSON.stringify(array);
      fs.writeFileSync(pathToProducts, data, "utf-8");
      return obj.id;

    } catch (error) {
      throw error;
    }
  }



  async deleteAll() {
    try {
      const array = await this.getAll()
        .then((res) => res)

        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(pathToProducts, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }



  async deleteById(id) {
    try {
      let array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        array = array.filter((obj) => {
          return obj.id !== id;
        });
        for (let i = 0; i < array.length; i++) {
          if (array[i].id > id) {
            array[i].id -= 1;
          }
        }
        fs.writeFileSync(pathToProducts, JSON.stringify(array), "utf-8");
      }
    } catch (error) {
      throw error;
    }
  }



  async update (id, title, price, thumbnail) {
    try {
      const productos = await this.getAll().then((res) => res);
      productos.map((producto) => {
        if (producto.id === id) {
          producto.title = title ? title : producto.title
          producto.price = price ? price : producto.price
          producto.thumbnail = thumbnail ? thumbnail : producto.thumbnail
        }
      });
      await this.deleteAll();
      fs.writeFileSync(pathToProducts, JSON.stringify(productos), 'utf-8');
      const productoActualizado = await this.getById(id).then((res) => res);
      return productoActualizado;
    } catch (error) {
      throw error;
    }
  }



}

module.exports = Contenedor;