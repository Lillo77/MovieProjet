import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponentComponent} from './navbar-component/navbar-component.component';
import { DetailsPageComponent } from './details-page/details-page.component';

@Component({
  selector: 'app-root',
  standalone: true, // Il componente è stand-alone

  imports: [RouterOutlet, NavbarComponentComponent, DetailsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MovieProject';
}
