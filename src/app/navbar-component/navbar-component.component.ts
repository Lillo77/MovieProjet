import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';



@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,

  ],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

}
