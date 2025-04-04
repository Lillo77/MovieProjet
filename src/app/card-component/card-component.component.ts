import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importa questo!

@Component({
  selector: 'app-card-component',
  imports: [CommonModule], // ✅ Aggiungi qui
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css',
})
export class CardComponentComponent {
  @Input() movies: any[] = []; // riceve la lista di film dal componente genitore
}
