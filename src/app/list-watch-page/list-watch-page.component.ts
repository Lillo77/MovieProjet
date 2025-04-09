import {Component, OnInit} from '@angular/core';
import {StoreService} from '../services/store.service';
import { CardComponentComponent } from "../card-component/card-component.component";


@Component({
  selector: 'app-list-watch-page',
  imports: [CardComponentComponent],
  templateUrl: './list-watch-page.component.html',
  styleUrl: './list-watch-page.component.css'
})

export class ListWatchPageComponent implements OnInit {
  listWhatch: any[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.listWhatch = this.storeService.getWatchlist();
  }
}
