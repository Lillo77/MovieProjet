import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Questo lo rende disponibile in tutta l'applicazione
})
export class MovieService {
  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'ce95410036ae0babdb5ab4308a1ab6a0'; // Sostituisci con la chiave API reale!

  constructor(private http: HttpClient) {
  }

  // Metodo per ottenere i film per categoria
  getMoviesByCategory(category: string, page: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/movie/${category}?api_key=${this.API_KEY}&page=${page}`
    );
  }
}
