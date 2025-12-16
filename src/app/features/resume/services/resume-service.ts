import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  // Api Url
  private baseUrl = 'https://profile-vitaie-backend-130193814024.us-central1.run.app/user';

  // Inject service
  http = inject(HttpClient);

  // Fetch resume data
  getResume(): Observable<Resume> {
    return this.http.get<Resume>(`${this.baseUrl}/resume`);
  }
}
