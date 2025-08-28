import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, TranslocoModule],
  template: `<div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-6">
                <mat-icon class="text-blue-500 text-6xl mb-4 animate-bounce">search_off</mat-icon>
                <h1 class="text-2xl font-semibold text-gray-800 mb-2">
                  {{ 'notFound.title' | transloco }}
                </h1>
                <p class="text-gray-600 mb-6">
                  {{ 'notFound.subtitle' | transloco }}
                </p>
                <a routerLink="/home" class="text-blue-600 underline hover:text-blue-800 text-sm">
                  {{ 'notFound.backToHome' | transloco }}
                </a>
              </div>
              `,
})
export class NotFoundComponent {
}
