import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProvisionService } from '../../core/services/provision.service';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [CommonModule, FormsModule, TranslocoModule, NgFor],
})
export class PricingComponent {
  private provision = inject(ProvisionService);
  private router = inject(Router);

  // מצבים
  showFreeForm = false;
  loadingFree = false;
  freeError = '';

  freeFeatures: Observable<string[]>;
  pro100Features: Observable<string[]>;
  pro250Features: Observable<string[]>;
  enterpriseFeatures: Observable<string[]>;

  constructor(private transloco: TranslocoService) {
    this.freeFeatures = this.transloco.selectTranslateObject<string[]>('pricing.free.features');
    this.pro100Features = this.transloco.selectTranslateObject<string[]>('pricing.pro_100.features');
    this.pro250Features = this.transloco.selectTranslateObject<string[]>('pricing.pro_250.features');
    this.enterpriseFeatures = this.transloco.selectTranslateObject<string[]>('pricing.enterprise.features');
  }

  /** התחלת חבילת חינם */
  onStartFree(formValue: { name: string; email: string; company: string }) {
    if (!formValue.name || !formValue.email || !formValue.company) {
      this.freeError = 'נא למלא את כל השדות';
      return;
    }

    this.loadingFree = true;
    this.freeError = '';

    this.provision.startFree(formValue).subscribe({
      next: () => {
        this.router.navigate(['/thank-you'], {
          queryParams: { plan: 'free' },
        });
      },
      error: () => {
        this.freeError = 'אירעה שגיאה, נסו שוב מאוחר יותר';
        this.loadingFree = false;
      },
      complete: () => (this.loadingFree = false),
    });
  }

  onChoosePaid(plan: 'pro100' | 'biz250') {
    const url =
      plan === 'pro100'
        ? environment.paymentLinks.plan_100
        : environment.paymentLinks.plan_250;

    window.location.href = url;
  }

  onEnterprise() {
    this.router.navigate(['/contact'], {
      queryParams: { plan: 'enterprise' },
    });
  }
}