import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roadmap } from '../interfaces/roadmap';

@Injectable({
  providedIn: 'root',
})
export class RoadmapService {
  private baseUrl = 'http://localhost:8080/roadmap';

  constructor(private http: HttpClient) {}

  getRoadmapByUserId(userId: number): Observable<Roadmap> {
    return this.http.get<Roadmap>(`${this.baseUrl}/user/${userId}`);
  }
}
