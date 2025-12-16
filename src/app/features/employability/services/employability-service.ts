import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employability } from '../interfaces/employability';

@Injectable({
  providedIn: 'root',
})
export class EmployabilityService {
  // Api Url
  private baseUrl = 'http://localhost:8080/user';

  // Inject service
  http = inject(HttpClient);

  // Fetch employability data
  getEmployability(): Observable<Employability> {
    return this.http.get<Employability>(`${this.baseUrl}/employability`);
  }
}
