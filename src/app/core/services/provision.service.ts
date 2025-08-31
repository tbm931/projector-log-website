import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProvisionService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  startFree(data: { name: string; email: string; company: string; }) {
    return this.http.post(`${this.base}/tenants/start-free`, data);
  }

  finalizePaid(data: { plan: string; email: string; sessionId?: string; reference?: string; }) {
    return this.http.post(`${this.base}/tenants/finalize-paid`, data);
  }
}