import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  imports: [CommonModule],
})
export class ThankYouComponent {
  private route = inject(ActivatedRoute);

  plan: string | null = null;
  type: string | null = null;

  ngOnInit() {
    this.plan = this.route.snapshot.queryParamMap.get('plan');
    this.type = this.route.snapshot.queryParamMap.get('type');
  }
}
