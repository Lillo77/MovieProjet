import { Component } from '@angular/core';
import { CardComponentComponent } from "../card-component/card-component.component";
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-searchbar-component',
  imports: [CardComponentComponent],
  templateUrl: './searchbar-component.component.html',
  styleUrl: './searchbar-component.component.css'
})
export class SearchbarComponentComponent {
  searchedMovies: any[] = [];
  searchTerm: string = "";
  page: number = 0;

  constructor(private route: ActivatedRoute,private movieService: MovieService){
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || "";
      this.searchMovies();
    })
  }

  searchMovies(){
    this.movieService.searchMovies(this.searchTerm).subscribe((movies) => {
      this.searchedMovies = movies.results;
      this.page = movies.page;
    })
  }
}