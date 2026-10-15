import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje } from '../../interfaces/personajes.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private httpClient = inject(HttpClient);

  getAllPersonajes(countPersonajes: number): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(`http://localhost:3003/api/personajes/${countPersonajes}`);
  }
}
