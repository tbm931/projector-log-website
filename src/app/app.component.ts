import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentYear = new Date().getFullYear();

  private translocoService = inject(TranslocoService);

  constructor() {
    this.translocoService.langChanges$.subscribe(lang => {
      this.setLang(lang);
    });
  }

  ngOnInit() {
    const currentLang = this.translocoService.getActiveLang();
    this.setLang(currentLang);
  }

  setLang(lang: string) {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }


}
