import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, TranslocoModule, MatTooltipModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  constructor(private translocoService: TranslocoService) {}

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
