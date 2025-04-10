
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

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

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/movie/${id}?api_key=${this.API_KEY}&append_to_response=credits,recommendations,videos,episodes`
    );
  }

  getRelatedMovies(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/movie/${movieId}/recommendations?api_key=${this.API_KEY}`
    );
  }

  // Metodo per cercare un film
  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`
    );
  }

  getGenres(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}`);
  }

  getMoviesByCategoryHome(genreId: number): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}`
    );
  }

  getMoviesByCategorySearch(genreId: number | null, page: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}&page=${page}`);
  }

}


