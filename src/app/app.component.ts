import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import {NavbarComponent} from './navbar-component/navbar-component.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'MovieProject';
}
