
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root', // Questo lo rende disponibile in tutta l'applicazione
})
export class MovieService {
  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'ce95410036ae0babdb5ab4308a1ab6a0'; // Sostituisci con la chiave API reale!

  constructor(private http: HttpClient) {}

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



  getRandomMovies(): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    const randomPage = Math.floor(Math.random() * 20) + 1; // TMDB ha fino a 500 pagine, ma limitiamo a 20-50 per sicurezza

    return this.http
      .get<any>(`${this.API_URL}/discover/movie`, {
        params: {
          api_key: this.API_KEY,
          sort_by: 'popularity.desc', // puoi anche usare 'vote_count.desc'
          'primary_release_date.lte': today,
          page: randomPage,
        },
      })
      .pipe(
        map((res) => ({
          ...res,
          results: this.shuffleArray(
            res.results.filter(
              (movie: any) =>
                movie.poster_path &&
                movie.overview &&
                movie.overview.trim() !== ''
            )
          ),
        }))
      );
  }

  // Metodo per mischiare array
  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}

