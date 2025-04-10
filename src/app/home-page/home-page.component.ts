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
export class HomePageComponent implements OnInit, AfterViewInit {
  categories: { name: string; movies: any[] }[] = []; // Array di categorie con i relativi film

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    const container = document.getElementById('Action'); // Esempio con una categoria
    if (container) {
      console.log('Larghezza visibile (offsetWidth):', container.offsetWidth);
      console.log('Larghezza totale (scrollWidth):', container.scrollWidth);
      console.log('Numero di figli:', container.children.length);

      const children = container.children;
      for (let i = 0; i < children.length; i++) {
        console.log(`Figlio ${i} larghezza:`, (children[i] as HTMLElement).offsetWidth);
      }
    }
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

      console.log('Prima dello scroll destra:', container.scrollLeft);
      if (container.scrollLeft < maxScroll) {
        container.scrollLeft += scrollAmount;
        console.log('Dopo lo scroll destra:', container.scrollLeft);
      } else {
        console.warn('Limite massimo raggiunto. Non è possibile scrollare oltre.');
      }
    }
  }






  scrollLeft(categoryId: string): void {
    const container = document.getElementById(categoryId);
    if (container) {
      // Aggiunge il listener per monitorare l'evento di scroll
      container.addEventListener('scroll', () => {
        console.log('Evento di scroll attivato:', container.scrollLeft);
      });

      const scrollAmount = container.offsetWidth; // Calcola la larghezza visibile
      container.scrollLeft -= scrollAmount; // Scroll manuale
      console.log('Dopo lo scroll sinistra:', {
        scrollLeft: container.scrollLeft,
        scrollWidth: container.scrollWidth,
        offsetWidth: container.offsetWidth
      });
    }
  }

}



