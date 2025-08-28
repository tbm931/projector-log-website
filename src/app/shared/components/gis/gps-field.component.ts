import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GpsMapPreviewComponent } from './gps-map-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gps-field',
  standalone: true,
  imports: [GpsMapPreviewComponent, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    button[disabled], button:disabled {
      cursor: not-allowed !important;
    }
  `],
  template: `
        <div class="space-y-3">

        <!-- 🧭 כפתור + קואורדינטות -->
        <div class="flex items-center gap-3">
            <button type="button" [disabled]="disabled"
                    (click)="getCurrentLocation()"
                    class="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white w-9 h-9 flex items-center justify-center shadow transition">
            <mat-icon fontSize="small">my_location</mat-icon>
            </button>

            <div class="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-xl min-w-[180px] text-center">
            {{ form.get('field_' + fieldId)?.value || 'לא זוהה מיקום' }}
            </div>
        </div>

        <!-- כתובת -->
        <div *ngIf="locationAddress" class="text-sm text-gray-500 italic ml-1">
            🏠 {{ locationAddress }}
        </div>

        <!-- 🌍 מפה -->
        <app-gps-map-preview
            *ngIf="form.get('field_' + fieldId)?.value"
            [coords]="form.get('field_' + fieldId)?.value"
            [showCoords]="false">
        </app-gps-map-preview>
        </div>
    `
})
export class GpsFieldComponent {
  @Input() form!: FormGroup;
  @Input() fieldId!: number;
  @Input() disabled: boolean = false;

  locationAddress: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  getCurrentLocation(): void {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(position => {
      const coords = `${position.coords.latitude},${position.coords.longitude}`;
      this.form.get('field_' + this.fieldId)?.setValue(coords);
      this.fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
      this.cdr.markForCheck(); // 🔁 מבקש לבדוק אם יש שינויים
    });
  }

  fetchAddressFromCoords(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    this.http.get<any>(url).subscribe({
      next: res => {
        this.locationAddress = res.display_name || 'כתובת לא זמינה';
        this.cdr.markForCheck(); // 🔁 מבקש לבדוק אם locationAddress השתנה
      },
      error: _ => {
        this.locationAddress = 'כתובת לא זמינה';
        this.cdr.markForCheck();
      }
    });
  }
}
