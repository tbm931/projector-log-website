import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { FeaturesComponent } from './features/features/features.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { ContactComponent } from './features/contact/contact.component';
import { ThankYouComponent } from './features/thank-you/thank-you.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'about', component: AboutComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' },
]