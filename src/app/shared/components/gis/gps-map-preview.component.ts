import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-gps-map-preview',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    template: `
        <div>
            <div class="flex items-center gap-2 text-sm text-blue-700 mb-2" *ngIf="showCoords">
                <mat-icon fontSize="small">location_on</mat-icon>
                <a [href]="getGoogleMapsLink()" target="_blank" class="underline hover:text-blue-900">
                    {{ coords }}
                </a>
            </div>

            <!-- 🗺️ תצוגת מפה מוטמעת -->
            <div *ngIf="isValidCoords()"
                class="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe width="100%" height="200" style="border:0" loading="lazy" allowfullscreen
                    [src]="safeMapUrl">
                </iframe>
            </div>
        </div>
    `,
})
export class GpsMapPreviewComponent {
    @Input() coords: string = ''; 
    @Input() showCoords: boolean = true; 

    constructor(private sanitizer: DomSanitizer) { }

    get safeMapUrl(): SafeResourceUrl {
        if (!this.isValidCoords()) return '';
        const [lat, lng] = this.coords.split(',');
        const url = `https://www.google.com/maps?q=${lat},${lng}&hl=iw&output=embed`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    isValidCoords(): boolean {
        return /^\-?\d+(\.\d+)?,\-?\d+(\.\d+)?$/.test(this.coords || '');
    }

    getGoogleMapsLink(): string {
        const [lat, lng] = this.coords.split(',');
        return `https://www.google.com/maps?q=${lat},${lng}`;
    }
}
