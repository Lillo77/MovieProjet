import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private favorites: any[] = [];
  private watchlist: any[] = [];
  private watchedList: number[] = []; // Elenco degli ID dei film visti

  addToFavorites(movie: any): void {
    this.favorites.push(movie);
  }

  removeFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter((item) => item.id !== movie.id);
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  addToWatchlist(movie: any): void {
    this.watchlist.push(movie);
  }

  removeFromWatchlist(movie: any): void {
    this.watchlist = this.watchlist.filter((item) => item.id !== movie.id);
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }

  addToWatchedList(movieId: number): void {
    if (!this.watchedList.includes(movieId)) {
      this.watchedList.push(movieId); // Salva l'ID nella lista dei film visti
      console.log('Film aggiunto come già visto:', movieId);
    }
  }

  getWatchedList(): number[] {
    return this.watchedList; // Restituisce la lista dei film visti
  }
}
