import {Component, OnInit} from '@angular/core';
import { StoreService } from '../services/store.service';


@Component({
  selector: 'app-favorites-page',
  imports: [
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {


  favorites: any[] = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.favorites = this.storeService.getFavorites();
  }
}
