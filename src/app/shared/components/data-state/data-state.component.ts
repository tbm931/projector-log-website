import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-state',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatIconModule],
  templateUrl: './data-state.component.html',
  styleUrl: './data-state.component.scss'
})
export class DataStateComponent {
  @Input() loading = false;
  @Input() error = false;
  @Input() empty = false;
  @Input() loadingText = 'common.loading';
  @Input() errorText = 'common.loadError';
  @Input() emptyText = 'common.empty';
}
