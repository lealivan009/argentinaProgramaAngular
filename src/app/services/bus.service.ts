import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { Model } from "../models/model";
import { Bus } from "../models/bus";

@Injectable({
  providedIn: 'root'
})
export class BusService {

  //EndPoint de los colectivos
  resourceUrl = environment.backendUrl + 'colectivos'


  //HttpClient es la que se encarga de hacer las peticiones tanto get, post, put o delete
  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: "response" }).pipe( //aca se manda el endpoint y lo que se quiere capturar, puede ser solo el body o toda la respuesta
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrio un error");
      })
    )
  }

  findOne(id: number): Observable<Bus> {
    return this.http.get<Bus>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  }

  crearBus(bus: BusDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, bus).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear el bus");
      }),
    );
  }


  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el bus seleccionado");
      }),
    );
  }

  actualizarBus(bus: BusDTO): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + bus.id, bus).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

}

export interface BusDTO {
  id?:number,
  patente:string,
  cantidadAsientos:number,
  modeloId: number;
}
