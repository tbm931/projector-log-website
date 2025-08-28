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
    this.detailService.getAll().forEach(detail => alert(detail));
  }
}
