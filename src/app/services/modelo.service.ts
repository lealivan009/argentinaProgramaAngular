import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Model} from "../models/model";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  resourceUrl = environment.backendUrl + 'modelos'

  constructor(private http: HttpClient) { }

  //Buscar todos los modelos
  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: "response" }).pipe( //aca se manda el endpoint y lo que se quiere capturar, puede ser solo el body o toda la respuesta
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrio un error");
      })
    )
  }

  //Buscar un modelo especifico
  findOne(id: number): Observable<Model> {
    return this.http.get<Model>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  }

  

}
