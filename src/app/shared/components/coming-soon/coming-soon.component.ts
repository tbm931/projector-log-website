import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-coming-soon',
  imports: [    
    TranslocoModule,
    MatIconModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {

}
