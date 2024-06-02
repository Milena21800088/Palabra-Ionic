import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {
  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  agregarInformacion(palabra: string): Observable<any> {
    const url = `${this.apiUrl}/palabras/ingresar`;
    return this.http.post<any>(url, { palabra });
  }
}