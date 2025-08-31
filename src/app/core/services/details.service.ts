import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsDTO } from '../models/details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private apiUrl = 'https://localhost:7235/api/Detail';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DetailsDTO[]> {
    return this.http.get<DetailsDTO[]>(`${this.apiUrl}/all`);
  }
}