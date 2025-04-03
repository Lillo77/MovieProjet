import { Component } from '@angular/core';
import {HeroComponentComponent} from '../hero-component/hero-component.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponentComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
