import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-update-dialog',
    standalone: true,
    template: `
    <div class="text-center p-4 space-y-4">
      <h2 class="text-lg font-semibold">{{ 'pwa.newVersionTitle' | transloco }}</h2>
      <p>{{ 'pwa.newVersionText' | transloco }}</p>
      <div class="flex justify-center gap-4 pt-2">
        <button mat-button (click)="close(false)">
          {{ 'pwa.cancel' | transloco }}
        </button>
        <button mat-raised-button color="primary" (click)="close(true)">
          {{ 'pwa.reloadNow' | transloco }}
        </button>
      </div>
    </div>
  `,
    styles: [`.mat-dialog-container { border-radius: 1rem; }`],
    imports: [MatButtonModule, TranslocoModule]
})
export class UpdateDialogComponent {
    constructor(private dialogRef: MatDialogRef<UpdateDialogComponent>) { }

    close(result: boolean) {
        this.dialogRef.close(result);
    }
}
