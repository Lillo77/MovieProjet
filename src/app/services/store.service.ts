import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private favoritesKey = 'favorites';
  private watchlistKey = 'watchlist';
  private watchedListKey = 'watchedList';
  private categorySubject = new BehaviorSubject<{ name: string; movies: any[] } | null>(null);

  constructor() {
    // Inizializza le liste dai dati del local storage
    this.loadFavorites();
    this.loadWatchlist();
    this.loadWatchedList();
  }

  // **Favorites**
  private favorites: any[] = [];
  addToFavorites(movie: any): void {
    this.favorites.push(movie);
    this.saveFavorites();
  }

  removeFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter((item) => item.id !== movie.id);
    this.saveFavorites();
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const favoritesData = localStorage.getItem(this.favoritesKey);
    this.favorites = favoritesData ? JSON.parse(favoritesData) : [];
  }

  // **Watchlist**
  private watchlist: any[] = [];
  addToWatchlist(movie: any): void {
    this.watchlist.push(movie);
    this.saveWatchlist();
  }

  removeFromWatchlist(movie: any): void {
    this.watchlist = this.watchlist.filter((item) => item.id !== movie.id);
    this.saveWatchlist();
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }

  private saveWatchlist(): void {
    localStorage.setItem(this.watchlistKey, JSON.stringify(this.watchlist));
  }

  private loadWatchlist(): void {
    const watchlistData = localStorage.getItem(this.watchlistKey);
    this.watchlist = watchlistData ? JSON.parse(watchlistData) : [];
  }

  // **Watched List**
  private watchedList: number[] = [];
  addToWatchedList(movieId: number): void {
    if (!this.watchedList.includes(movieId)) {
      this.watchedList.push(movieId);
      this.saveWatchedList();
    }
  }

  getWatchedList(): number[] {
    return this.watchedList;
  }

  private saveWatchedList(): void {
    localStorage.setItem(this.watchedListKey, JSON.stringify(this.watchedList));
  }

  private loadWatchedList(): void {
    const watchedListData = localStorage.getItem(this.watchedListKey);
    this.watchedList = watchedListData ? JSON.parse(watchedListData) : [];
  }

  // **Selected Category**
  getSelectedCategory() {
    return this.categorySubject.asObservable();
  }

  setSelectedCategory(category: { name: string; movies: any[] }): void {
    this.categorySubject.next(category);
  }
}
