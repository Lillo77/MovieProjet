import {Component, OnInit} from '@angular/core';
import {StoreService} from '../services/store.service';


@Component({
  selector: 'app-list-watch-page',
  imports: [],
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
