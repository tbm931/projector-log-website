import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { BackButtonComponent } from '../buttons/back-button.components';
import { AddItemButtonComponent } from '../buttons/add-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-header',
  imports: [CommonModule, MatIconModule, TranslocoModule, BackButtonComponent, AddItemButtonComponent],
  standalone: true,
  template: `
    <div>
      <div class="flex justify-between items-center pt-2 border-b-2 border-black-600 pb-2">
        <div class="flex">
          <app-back-button *ngIf="isShowBackButton" (back)="goBack()"></app-back-button>
          <div class="pr-3 pl-3 flex items-center gap-2 text-2xl font-bold text-indigo-900">
            <mat-icon *ngIf="icon" class="text-indigo-900">{{ icon }}</mat-icon>
            <span>{{ headerTitle | transloco }}</span>
          </div>
        </div>
        
        <app-add-item-button
          *ngIf="addItemRoute || addItemFn"
          [label]="addItemLabel"
          [route]="addItemRoute"
          (clicked)="addItemFn?.()"
        ></app-add-item-button>

        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ListHeaderComponent {
  @Input() headerTitle = '';
  @Input() icon = 'folder';

  @Input() backRoute = '/home';
  @Input() backFn?: () => void;
  @Input() isShowBackButton: boolean = true;

  @Input() addItemRoute = '';
  @Input() addItemFn?: () => void;
  @Input() addItemLabel = 'common.add';

  constructor(private router: Router) { }

  goBack() {
    if (this.backFn) {
      this.backFn();
    } else if (this.backRoute) {
      this.router.navigate([this.backRoute]);
    }
  }
}
