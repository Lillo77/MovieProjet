import {Component, OnInit} from '@angular/core';
import { StoreService } from '../services/store.service';
import { CardComponentComponent } from "../card-component/card-component.component";


@Component({
  selector: 'app-favorites-page',
  imports: [
    CardComponentComponent
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
