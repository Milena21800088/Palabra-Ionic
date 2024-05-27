import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { } 

  getInformacion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'jugadores');
  }
  
  agregarInformacion(Nombre: string, Correo: string, Telefono: string, Resultado: string, Intentos: number, Nivel: string, Tiempo: number): Observable<any> {
    return this.http.post<any>(this.apiUrl+'jugadores/add', { Nombre, Correo, Telefono, Resultado, Intentos, Nivel, Tiempo });
  }
}
