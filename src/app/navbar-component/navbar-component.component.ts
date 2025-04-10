import {Component, OnInit} from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {SearchbarComponentComponent} from '../searchbar-component/searchbar-component.component';
import {Router, RouterLink} from '@angular/router';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchbarComponentComponent,
    NgbNavModule, NgbDropdownModule, RouterLink
  ],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponent implements OnInit {

  genres: any[] = []; // Array per i generi

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe((data) => {
      this.genres = data.genres; // Carica i generi dal servizio
    });
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault(); // Evita il refresh della pagina
    const inputElement = (event.target as HTMLFormElement).querySelector('input');
    const searchTerm = inputElement?.value.trim();

    if (searchTerm) {
      this.router.navigate(['/search'], { queryParams: { query: searchTerm } });
    }
  }

  navigateToGenre(genreId: number, genreName: string): void {
    this.router.navigate(['/search'], { queryParams: { genre: genreId, genreName } });
  }
}

