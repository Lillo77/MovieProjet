import {Component, OnInit, HostListener, AfterViewInit} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { HeroComponentComponent } from '../hero-component/hero-component.component';
import { TitleCasePipe } from '@angular/common';
import {CardComponentComponent} from '../card-component/card-component.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponentComponent, CardComponentComponent, TitleCasePipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  categories: { name: string; movies: any[] }[] = []; // Array di categorie con i relativi film

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.movieService.getGenres().subscribe((genreData) => {
      const genres = genreData.genres; // Ottieni la lista dei generi
      genres.forEach((genre: any) => {
        this.movieService.getMoviesByCategoryHome(genre.id).subscribe((data) => {
          const sortedMovies = data.results
            .filter((movie: {
              release_date: any;
            }) => movie.release_date) // Assicura che ci siano film con data di uscita
            .sort((a: { release_date: string | number | Date; }, b: {
              release_date: string | number | Date;
            }) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()) // Ordina per data
            .slice(0, 20); // Limita a 10 film
          if (sortedMovies.length > 0) {
            this.categories.push({
              name: genre.name,
              movies: sortedMovies
            });
          }
        });
      });
    });
  }


  scrollRight(categoryId: string): void {
    const container = document.getElementById(categoryId);

    if (container) {
      const scrollAmount = container.offsetWidth;
      const maxScroll = container.scrollWidth - container.offsetWidth;

      if (container.scrollLeft < maxScroll) {
        container.scrollLeft += scrollAmount;
      }
    }
  }






  scrollLeft(categoryId: string): void {
    const container = document.getElementById(categoryId);
    if (container) {
      const scrollAmount = container.offsetWidth; // Calcola la larghezza visibile
      container.scrollLeft -= scrollAmount; // Scroll manuale
    }
}
}

