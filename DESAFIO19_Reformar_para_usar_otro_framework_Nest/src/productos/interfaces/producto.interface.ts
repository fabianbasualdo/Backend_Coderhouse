/*interface.ts en nest son los modelos, es decir, donde definire la tabla de mis base de datos y el tipo de datos por cada nueva tabla tendre un interface.ts*/
export interface Producto {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly thumbnail: string;
}

