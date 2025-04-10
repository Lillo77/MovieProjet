import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css',
})
export class CardComponentComponent {
  @Input() movie: any = null; // Lista generica di film
  @Input() layout: 'horizontal' | 'vertical' = 'vertical'; // Layout: orizzontale o verticale
}


