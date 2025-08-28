import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslocoModule, TranslocoService } from "@ngneat/transloco";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-back-button',
    standalone: true,
    imports: [CommonModule, TranslocoModule, MatIconModule, MatProgressSpinnerModule],
    styleUrl: './action-buttons.css',
    template: `
        <button *ngIf="back.observers.length > 0" (click)="back.emit()"
            class="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-2.5 py-1.5 rounded-md shadow-sm hover:bg-gray-100 hover:border-gray-400 transition duration-150 ease-in-out">
            <mat-icon class="text-base">{{iconName}}</mat-icon>
        </button>
    `
})
export class BackButtonComponent implements OnInit, OnDestroy {
    
    @Output() back = new EventEmitter<void>();

    constructor(private _translocoService: TranslocoService) {
        const lang = _translocoService.getActiveLang();
        this.direction = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
    }

    direction: 'ltr' | 'rtl' = 'ltr';
    private langSub?: Subscription;

    ngOnInit(): void {
        // עדכון ראשוני
        this.updateDirection(this._translocoService.getActiveLang());

        // מעקב אחרי שינוי שפה
        this.langSub = this._translocoService.langChanges$.subscribe(lang => {
            this.updateDirection(lang);
        });
    }

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }

    private updateDirection(lang: string): void {
        this.direction = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
    }


    get iconName() {
        return this.direction === 'rtl' ? 'arrow_forward' : 'arrow_back';
    }
}
