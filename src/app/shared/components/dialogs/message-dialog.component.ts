import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

export interface MessageDialogData {
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string; // ✨ חדש: טקסט לכפתור ביטול
}

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule
  ],
  template: `
    <div class="p-5 max-w-sm w-full space-y-4 text-center">
      <!-- 🔺 כותרת -->
      <div class="flex items-center justify-center gap-2" [ngClass]="[color, directionClass]">
        <mat-icon class="text-3xl">{{ icon }}</mat-icon>
        <h2 class="text-lg font-bold">
          {{ data.title || ('messageDialog.title' | transloco) }}
        </h2>
      </div>

      <!-- 📝 טקסט -->
      <p class="text-sm text-gray-700 leading-relaxed">
        {{ data.message }}
      </p>

      <!-- 🔘 כפתורים -->
      <div class="flex justify-center mt-4 gap-2" *ngIf="data.cancelText; else singleBtn">
        <button mat-stroked-button color="primary" class="rounded-full text-sm" (click)="onCancel()">
          {{ data.cancelText }}
        </button>
        <button mat-flat-button color="primary" class="rounded-full text-sm" (click)="onConfirm()">
          {{ data.confirmText || ('messageDialog.confirm' | transloco) }}
        </button>
      </div>

      <ng-template #singleBtn>
        <div class="flex justify-center mt-4">
          <button mat-flat-button color="primary" class="rounded-full text-sm" (click)="onConfirm()">
            {{ data.confirmText || ('messageDialog.cancel' | transloco) }}
          </button>
        </div>
      </ng-template>
    </div>
  `,
})
export class MessageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData,
    private transloco: TranslocoService
  ) { }

  get icon(): string {
    switch (this.data.type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }

  get color(): string {
    switch (this.data.type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  }

  get directionClass(): string {
    return document.dir === 'rtl' ? 'flex-row-reverse' : 'flex-row';
  }

  onConfirm() {
    this.dialogRef.close(true); // ✔️
  }

  onCancel() {
    this.dialogRef.close(false); // ❌
  }
}
