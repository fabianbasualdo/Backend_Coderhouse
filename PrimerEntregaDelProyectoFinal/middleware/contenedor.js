const fs = require('fs/promises');

class Contenedor{
   
   
    constructor(fileName){
        this.filePath = fileName;

        //el metodo readFile() esta declarado abajo de este constructor.
        this.data = this.readFile();
    }


    //metodo que utilizo en el constructor para leer el archivo
    async readFile(){
        try {
            const readenFile = await fs.readFile(this.filePath, 'utf-8');

            if(readenFile == ''){
                //si no pudo leer el archivo retona un []
                return []
            }else{
                //parsea y retorna el contenido leido en el archivo
                return JSON.parse(readenFile)
            }
        } catch (err){
            console.error(err.message)
            return []
        }
    }


    async writeAllFile(array){
        await fs.writeFile(this.filePath, JSON.stringify(array, null, 3))
        this.data = this.readFile();
    }


    async writeFile(obj){
        const fileContent = await this.data
        //le hace un push al contenido del archivo
        fileContent.push(obj)
        //sobreescribe el archivo con el contenido de fileContent
        await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 3))
    }

    async deleteAll(){
        try{
            let newContent = []
            //sobreescribe el archivo con el contenido []
            await fs.writeFile(this.filePath, newContent)
            this.data = newContent
        }catch{
            return {Error: "En el borrado Total de Archivo"}
        }
    }
}

module.exports = Contenedor 