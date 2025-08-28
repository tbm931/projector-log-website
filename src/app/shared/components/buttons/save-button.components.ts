import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'app-save-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatIconModule, MatProgressSpinnerModule],
    styleUrl: './action-buttons.css',
    template: `
            <button type="submit" (click)="onClick()" [disabled]="disabled || isSaving" 
                class="action-button action-save hover:ring-2 flex items-center gap-2 justify-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60">
                <ng-container *ngIf="!isSaving; else loadingIcon">
                    <mat-icon *ngIf="isShowIcon" class="text-white">save</mat-icon>
                    <span>{{ label | transloco }}</span>
                </ng-container>
                <ng-template #loadingIcon>
                    <mat-progress-spinner diameter="18" mode="indeterminate" color="accent" class="!text-white" [strokeWidth]="3"></mat-progress-spinner>
                </ng-template>
            </button>
    `
})
export class SaveButtonComponent {
    @Input() label: string = 'common.save';
    @Input() disabled = false;
    @Input() isSaving = false;
    @Input() isShowIcon = true;

    @Output() clicked = new EventEmitter<void>();

    onClick(): void {
        this.clicked.emit();
    }

}
