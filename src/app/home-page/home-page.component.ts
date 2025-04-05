import { Component, OnInit } from '@angular/core';
import { HeroComponentComponent } from '../hero-component/hero-component.component';
import { CardComponentComponent } from '../card-component/card-component.component';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home-page',
  standalone: true, // Componente stand-alone

  imports: [HeroComponentComponent, CardComponentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  // ngOnInit(): void {
  //   this.movieService.getLatestMovies().subscribe({
  //     next: (res) => {
  //       this.movies = res.results;
  //     },
  //     error: (err) => {
  //       console.error('Errore nel recuperare i film più recenti:', err);
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe({
      next: (res) => {
        this.movies = res.results.filter(
          (movie: any) =>
            movie.poster_path && movie.overview && movie.overview.trim() !== ''
        );
      },
      error: (err) => {
        console.error('Errore nel recuperare i film più recenti:', err);
      },
    });
  }
}