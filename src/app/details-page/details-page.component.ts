import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Location } from '@angular/common'; // Importa Location
import { CommonModule } from '@angular/common'; // Importa CommonModule per *ngIf

@Component({
  selector: 'app-details-page',
  standalone: true, // Componente stand-alone
  imports: [CommonModule], // Aggiungi CommonModule qui
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log('Movie ID:', movieId); // Verifica l'ID che viene passato

    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe({
        next: (res) => {
          console.log('Movie Details:', res); // Verifica la risposta del servizio

          this.movie = res;
        },
        error: (err) => {
          console.error('Errore nel recuperare i dettagli del film:', err);
        },
      });
    }
  }

  // Metodo per tornare indietro alla pagina precedente
  goBack(): void {
    this.location.back();
  }
}