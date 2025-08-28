import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-add-item-button',
  imports: [RouterModule, TranslocoModule, MatIconModule],
  standalone: true,
  template: `
    <div class="flex justify-end mb-3 mt-3">
      <button
        mat-flat-button
        color="primary"
        class="flex items-center gap-2 text-indigo-900"
        (click)="onClick()"
        [attr.aria-label]="label | transloco"
      >
        <mat-icon class="text-indigo-900">add_circle</mat-icon>
        <span>{{ label | transloco }}</span>
      </button>
    </div>
  `,
})
export class AddItemButtonComponent {
  @Input() route?: string;
  @Input() label = '';
  @Output() clicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClick() {
    if (this.route) {
      this.router.navigate([this.route]);
    } else {
      this.clicked.emit();
    }
  }
}
