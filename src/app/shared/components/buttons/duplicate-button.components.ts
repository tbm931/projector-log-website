import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'app-duplicate-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatIconModule],
    styleUrl: './action-buttons.css',
    template: `
        <button type="button" (click)="clicked.emit()" class="action-button action-duplicate">
            <mat-icon>content_copy</mat-icon>
            <span>{{ label | transloco }}</span>
        </button>
    `
})
export class DuplicateButtonComponent {
    @Input() label: string = 'edit.duplicate_template';
    @Output() clicked = new EventEmitter<void>();
}
