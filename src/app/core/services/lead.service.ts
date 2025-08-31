import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadPayload } from '../models/lead.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  createLead(payload: LeadPayload) {
    return this.http.post(`${this.base}/leads`, payload);
  }
}
