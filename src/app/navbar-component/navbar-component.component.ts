import {Component, OnInit} from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {SearchbarComponentComponent} from '../searchbar-component/searchbar-component.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchbarComponentComponent,
    NgbNavModule, NgbDropdownModule, RouterLink
  ],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}
