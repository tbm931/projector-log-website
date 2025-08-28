import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-copy-link-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatTooltipModule, MatIconModule],
    template: `
    <button
      mat-icon-button
      [matTooltip]="'common.copyLink' | transloco"
      aria-label="Copy link"
      (click)="copyLink()"
      [disabled]="copied"
      class="transition hover:scale-110 active:scale-100">
      <mat-icon>{{ copied ? 'check' : 'link' }}</mat-icon>
    </button>
  `,
})
export class CopyLinkButtonComponent {
    @Input() entityId!: number;
    @Input() linkGenerator!: (id: number) => string;

    copied = false;

    constructor(
        private clipboard: Clipboard,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) { }

    copyLink(): void {
        const link = this.linkGenerator(this.entityId);
        this.clipboard.copy(link);

        this.copied = true;
        const message = this.transloco.translate('common.linkCopied');

        this.snackBar.open(message, this.transloco.translate('common.close'), {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });

        setTimeout(() => (this.copied = false), 2000);
    }
}
