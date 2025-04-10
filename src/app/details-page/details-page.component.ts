import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { StoreService } from '../services/store.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CardComponentComponent} from '../card-component/card-component.component';


@Component({
  selector: 'app-details-page',
  standalone: true,
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  imports: [
    CardComponentComponent
  ]
})
export class DetailsPageComponent implements OnInit {
  movie: any;
  trailerUrl: SafeResourceUrl | null = null; // URL del trailer sanitizzato
  isTrailerVisible = false; // Controlla la visibilità del trailer
  isWatched = false; // Indica se il contenuto è già stato visto
  movies: any[] = []; // Tutti i contenuti correlati
  limitedMovies: any[] = []; // Limitati a 10 elementi



  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private storeService: StoreService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const descriptionSection = document.querySelector('.details-overlay') as HTMLElement;
    const backgroundSection = document.querySelector('.details-top') as HTMLElement;
    const relatedTitle = document.querySelector('.details-extra-title') as HTMLElement;

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      // Gestione della descrizione (muove verso l'alto e svanisce)
      if (scrollPosition > 0 && scrollPosition <= 300) {
        descriptionSection.style.transform = `translateY(-${scrollPosition * 0.3}px)`;
        descriptionSection.style.opacity = `${1 - scrollPosition / 300}`;
      }

      // Oscuramento del background
      if (scrollPosition > 300 && scrollPosition <= 600) {
        backgroundSection.style.filter = `brightness(${1 - (scrollPosition - 300) / 300})`;
        backgroundSection.style.opacity = `${1 - (scrollPosition - 300) / 300}`;
      }

      // Nascondere il titolo dei contenuti correlati
      if (scrollPosition > 600) {
        relatedTitle.style.opacity = `${1 - (scrollPosition - 600) / 100}`;
      } else {
        relatedTitle.style.opacity = '1';
      }
    });
    // Usa paramMap per rilevare cambiamenti nell'ID della rotta
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.loadMovieDetails(Number(movieId)); // Carica i dettagli aggiornati
      }
    });

    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(Number(movieId));
    }
  }

  loadMovieDetails(id: number): void {
    this.movieService.getMovieDetails(id).subscribe((data) => {
      this.movie = data;

      // Verifica se il film è nei preferiti
      const favorites = this.storeService.getFavorites();
      this.movie.isFavorite = favorites.some((fav) => fav.id === this.movie.id);

      // Verifica se il film è nella lista Guarda più Tardi
      const watchlist = this.storeService.getWatchlist();
      this.movie.isInWatchlist = watchlist.some((item) => item.id === this.movie.id);

      // Controlla se è già visto
      this.isWatched = this.storeService.getWatchedList().includes(this.movie.id);

      // Ottieni i film correlati
      this.movieService.getRelatedMovies(id).subscribe((relatedData) => {
        console.log('Dati correlati:', relatedData); // Debug
        this.movies = Array.isArray(relatedData.results) ? relatedData.results : [];
        console.log('Film correlati:', this.movies); // Debug
        this.limitedMovies = this.movies.slice(0, 10);
        console.log('Film limitati:', this.limitedMovies); // Debug
      });
    });
  }


  toggleFavorites(): void {
    if (this.movie.isFavorite) {
      this.storeService.removeFromFavorites(this.movie);
      this.movie.isFavorite = false;
    } else {
      this.storeService.addToFavorites(this.movie);
      this.movie.isFavorite = true;
    }
  }


  toggleWatchlist(): void {
    if (this.movie.isInWatchlist) {
      this.storeService.removeFromWatchlist(this.movie);
      this.movie.isInWatchlist = false;
    } else {
      this.storeService.addToWatchlist(this.movie);
      this.movie.isInWatchlist = true;
    }
  }

  showTrailer(): void {
    this.isTrailerVisible = true; // Mostra il trailer
    this.markAsWatched();
    const videoKey = this.movie?.videos?.results[0]?.key; // Verifica l'esistenza del trailer
    if (videoKey) {
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoKey}?autoplay=1`
      );

      // Forzare l'elemento in modalità fullscreen
      const modal = document.querySelector('.trailer-modal') as HTMLElement;
      if (modal.requestFullscreen) {
        modal.requestFullscreen(); // Avvia la modalità fullscreen
      } else if ((modal as any).webkitRequestFullscreen) {
        (modal as any).webkitRequestFullscreen(); // Per browser WebKit
      } else if ((modal as any).msRequestFullscreen) {
        (modal as any).msRequestFullscreen(); // Per browser Microsoft
      }

    } else {
      alert('Trailer non disponibile!');
    }
  }

  markAsWatched(): void {
    this.storeService.addToWatchedList(this.movie.id); // Usa il metodo nel servizio
    this.isWatched = true; // Aggiorna lo stato nel componente
  }


  closeTrailer(): void {
    this.isTrailerVisible = false; // Nascondi il trailer

    // Uscire dalla modalità fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen(); // Per browser WebKit
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen(); // Per browser Microsoft
    }
  }
}
