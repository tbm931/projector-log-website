import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-clear-filters-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatIconModule],
    styleUrl: './action-buttons.css',
    template: `
    <button type="button" (click)="clicked.emit()" class="flex items-center gap-1 border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200">
      <mat-icon>filter_alt_off</mat-icon>
      <span>{{ label | transloco }}</span>
    </button>
  `
})
export class ClearFiltersButtonComponent {
    @Input() label: string = 'common.clearFilters';
    @Output() clicked = new EventEmitter<void>();
}
