import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProvisionService } from '../../core/services/provision.service';

@Component({
  standalone: true,
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [CommonModule, FormsModule],
})
export class PricingComponent {
  private provision = inject(ProvisionService);
  private router = inject(Router);

  // מצבים
  showFreeForm = false;
  loadingFree = false;
  freeError = '';

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