import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import {FavoritesPageComponent} from './favorites-page/favorites-page.component';
import {ListWatchPageComponent} from './list-watch-page/list-watch-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },// Rotta per la homepage
  { path: 'favorite', component: FavoritesPageComponent },
  { path: 'details/:id', component: DetailsPageComponent },
  { path: 'list-watch', component: ListWatchPageComponent }

];
