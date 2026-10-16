import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje } from '../../interfaces/personajes.interface';

/**
 * Servicio encargado de la gestion de personajes
 * 
 * Proporciona metodos para obtener informacion de personajes
 * desde la API REST
 */
@Injectable({
  providedIn: 'root',
})
export class PersonajesService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API
   * Se inyecta usando la funcion `inject`
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de personajes desde el backend
   * 
   * @param countPersonajes Numero de personajes a obtener
   * @returns Observable que emite un arrat de personajes
   */
  getAllPersonajes(countPersonajes: number): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(`http://localhost:3003/api/personajes/${countPersonajes}`);
  }
}
