import crypto from "crypto";
import { asDto } from "../dtos/PersonaDTO.js";
import Persona from "../models/Persona.js";

export default class PersonasDaoMem {
  constructor() {
    this.personasMap = {};//defino el array en el constructor
  }

  /********************************************************************************* */
  getAll() {
    const personas = Object.values(this.personasMap);//guardo lo que contiene el array 
    return asDto(personas); //valido que sea un array con asDto si es lo dejamos pasar
  }
  /********************************************************************************* */

  getById(id) {
    //si no hay datos en el array con ese id retona throw
    if (!this.personasMap[id]) {
      throw new Error("Persona no encontrada");
    }
    //asDto valida que sea un array si es un array lo retorna
    return asDto(this.personasMap[id]);
  }
 /********************************************************************************* */
  save(datos) {
    const id = crypto.randomBytes(10).toString("hex");//crea un id
    const nuevaPersona = new Persona(id, datos);//creo el objeto persona con el nuevo dato
    this.personasMap[id] = nuevaPersona;//cargo el array con la nueva persona
    return asDto(nuevaPersona); // asDto validamos que sea un array, si es un array retorna
  }
/********************************************************************************* */
  deleteById(id) {
    if (!this.personasMap[id]) {
      throw new Error("Persona no encontrada");
    }
    const personaBorrada = this.personasMap[id];
    delete this.personasMap[id]; //borra
    return asDto(personaBorrada);//antes de retornar con asDto valida que sea un array
  }
/********************************************************************************* */
  updateById(id, datos) {
    if (!this.personasMap[id]) {
      throw new Error("Persona no encontrada");
    }
    const personaActualizada = new Persona(id, datos);
    this.personasMap[id] = personaActualizada;
    return asDto(personaActualizada);
  }
/********************************************************************************* */

}
