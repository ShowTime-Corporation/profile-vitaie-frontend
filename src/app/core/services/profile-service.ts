import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';
import { UserProfileRequestDTO } from '../../features/edit-profile/interfaces/user-profile-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // Define api url
  private apiUrl = 'http://localhost:8080/user/me';

  // Inject http service
  private http = inject(HttpClient);

  // Fetch user profile
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }

  // Update user profile
  updateProfile(profile: UserProfileRequestDTO): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.apiUrl, profile);
  }

  // Upload cv file
  uploadCv(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-cv`, formData);
  }
}
