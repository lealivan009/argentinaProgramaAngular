import {Model} from "./model";
//Clase Bus con sus atributos y constructor
export class Bus {
  id: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
  modelo: Model;

  constructor(id: number, patente: string, cantidadAsientos: number, modeloId: number) {
    this.id = id;
    this.patente = patente;
    this.cantidadAsientos = cantidadAsientos;
    this.modeloId = modeloId;
  }

}
