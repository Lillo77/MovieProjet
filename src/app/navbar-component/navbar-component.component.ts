import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar-component',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

}
