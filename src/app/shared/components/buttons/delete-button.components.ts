import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'app-delete-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatIconModule],
    styleUrl: './action-buttons.css',
    template: `
        <button type="button" (click)="clicked.emit()" class="action-button action-delete">
            <mat-icon>delete</mat-icon>
            <span>{{ label | transloco }}</span>
        </button>
    `
})
export class DeleteButtonComponent {
    @Input() label: string = 'edit.delete_template';
    @Output() clicked = new EventEmitter<void>();
}
