import {Component, HostListener, OnInit} from '@angular/core';
import { CardComponentComponent } from "../card-component/card-component.component";
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-searchbar-component',
  imports: [CardComponentComponent, NgForOf],
  templateUrl: './searchbar-component.component.html',
  styleUrl: './searchbar-component.component.css'
})
export class SearchbarComponentComponent implements OnInit {
  searchedMovies: any[] = [];
  searchTerm: string = "";
  page: number = 0;
  genreId!: number | null; // ID del genere selezionato
  genreName: string = ''; // Nome del genere


  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || "";
      this.searchMovies();
    })
  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.genreId= params.get('genre') ? +params.get('genre')! : null;
      this.genreName = params.get('genreName') || '';
      this.page = 1;

      if (this.genreId) {
        this.loadMoviesByGenre();
      }
    });
  }

  loadMoviesByGenre(): void {
    this.movieService.getMoviesByCategorySearch(this.genreId, this.page).subscribe((response: any) => {
      this.searchedMovies = response.results; // Aggiorna i film
    });
  }

  // Scrolling dinamico
  @HostListener('window:scroll', [])
  onScroll(): void {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

    if (bottomReached) {
      this.page += 1; // Incrementa il numero di pagina
      this.movieService.getMoviesByCategorySearch(this.genreId, this.page).subscribe((response: any) => {
        this.searchedMovies = [...this.searchedMovies, ...response.results]; // Aggiungi nuovi film
      });
    }
  }


  searchMovies() {
    this.movieService.searchMovies(this.searchTerm).subscribe((movies) => {
      this.searchedMovies = movies.results;
      this.page = movies.page;
    })
  }
  trackById(index: number, movie: any): number {
    return movie.id; // Restituisce l'ID del film
  }

}
