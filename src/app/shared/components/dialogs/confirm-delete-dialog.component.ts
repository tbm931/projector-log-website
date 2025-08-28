import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-confirm-delete-dialog',
    imports: [CommonModule, RouterModule, TranslocoModule, MatDialogModule],
    standalone: true,
    template: `
                <div class="p-5 max-w-sm w-full space-y-4 text-center">
                <!-- 🔺 כותרת -->
                <h2 class="text-lg font-bold text-red-600">
                    {{ 'deleteDialog.confirmTitle' | transloco }}
                </h2>

                <!-- 📝 טקסט -->
                <p class="text-sm text-gray-700 leading-relaxed">
                    {{ 'deleteDialog.confirmMessage' | transloco }}
                </p>

                <!-- 🔘 כפתורים -->
                <div class="flex justify-center gap-4 mt-4 flex-wrap">
                    <button mat-stroked-button mat-dialog-close class="text-sm rounded-full">
                    {{ 'common.close' | transloco }}
                    </button>
                    <button mat-flat-button color="warn" [mat-dialog-close]="true" class="text-sm rounded-full">
                    {{ 'common.delete' | transloco }}
                    </button>
                </div>
                </div>
            `,
})
export class ConfirmDeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
