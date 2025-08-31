import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, FormsModule],
})
export class ContactComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  // מודל פשוט עבור הטופס
  formData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  error: string | null = null;

  submitForm() {
    this.isSubmitting = true;
    this.error = null;

    // כאן שולחים ל־API שלך
    this.http.post(`${environment.apiBaseUrl}/contact`, this.formData)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          // הפניה לעמוד תודה
          this.router.navigate(['/thankyou'], { queryParams: { type: 'lead' } });
        },
        error: (err) => {
          this.isSubmitting = false;
          this.error = 'משהו השתבש, נסי שוב מאוחר יותר';
          console.error('Contact form error:', err);
        }
      });
  }
}