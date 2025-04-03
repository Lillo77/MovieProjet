import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero-component.component.html',
  styleUrls: ['./hero-component.component.css'],
  imports: [
    AsyncPipe,
    RouterLink
  ]
})
export class HeroComponentComponent {
  heroMovies$: Observable<any[]>;

  constructor(private movieService: MovieService) {
    this.heroMovies$ = this.movieService.getMoviesByCategory('upcoming', 1).pipe(
      map((data) => data.results.slice(0, 10)) // Mostra i primi 10 film
    );
  }
}
