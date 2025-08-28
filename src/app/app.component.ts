import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

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
