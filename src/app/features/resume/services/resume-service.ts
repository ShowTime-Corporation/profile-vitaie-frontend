import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  // Api Url
  private baseUrl = 'http://localhost:8080/user';

  // Inject service
  http = inject(HttpClient);

  // Fetch resume data
  getResume(): Observable<Resume> {
    return this.http.get<Resume>(`${this.baseUrl}/resume`);
  }
}
