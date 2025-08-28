import { Component, inject } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { SubmenuService } from '../services/submenu.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-submenu-panel',
  imports: [TranslocoModule, CommonModule, MatIconModule, RouterModule],
  standalone: true,
  templateUrl: './submenu-panel.component.html',
  styleUrl: './submenu-panel.component.scss'
})
export class SubmenuPanelComponent {
  service = inject(SubmenuService);
}
