import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employability } from '../interfaces/employability';

@Injectable({
  providedIn: 'root',
})
export class EmployabilityService {
  private baseUrl = 'http://localhost:8080/employability';

  constructor(private http: HttpClient) {}

  getEmployabilityByUserId(userId: number): Observable<Employability> {
    return this.http.get<Employability>(`${this.baseUrl}/user/${userId}`);
  }
}
