import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoModule } from '@ngneat/transloco';
import { environment } from '../environments/environment';
import { TranslocoHttpLoader } from '../transloco-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // ← זה היה חסר
    importProvidersFrom(TranslocoModule), // כדי לספק את transpiler
    provideTransloco({
      config: {
        availableLangs: ['he', 'en', 'es'],
        defaultLang: 'he',
        reRenderOnLangChange: true,
        prodMode: environment.production
      },
      loader: TranslocoHttpLoader
    })
  ]
};