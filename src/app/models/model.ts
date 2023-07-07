//Clase para el modelo y marca del vehiculo
export class Model {
  id:	number;
  nombre:	string;
  marca: string;

  constructor(id: number, nombre: string, marca: string) {
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
  }
}
