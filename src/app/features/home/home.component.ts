import { Component } from '@angular/core';
import { DetailService } from '../../core/services/details.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private detailService: DetailService) {}
  onClick() {
    alert('Button clicked!');
    this.detailService.getAll().subscribe(
      {
        next: (details) => {
          details.map(detail => `ID: ${detail.id}, Name: ${detail.name}, Description: ${detail.description}, Price: ${detail.price}`).forEach(detailString => alert(detailString));
        },
        error: (err) => console.error('Error fetching details:', err)
      }
    )
  }
}
