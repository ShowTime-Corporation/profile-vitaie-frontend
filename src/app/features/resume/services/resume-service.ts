import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private baseUrl = 'http://localhost:8080/resume';

  constructor(private http: HttpClient) {}

  getResumeByUserId(userId: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.baseUrl}/user/${userId}`);
  }
}
