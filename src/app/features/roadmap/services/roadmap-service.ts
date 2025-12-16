import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roadmap } from '../interfaces/roadmap';

@Injectable({
  providedIn: 'root',
})
export class RoadmapService {
  // Api Url
  private baseUrl = 'http://localhost:8080/user';

  // Inject service
  http = inject(HttpClient);

  // Fetch roadmap data
  getRoadmap(): Observable<Roadmap> {
    return this.http.get<Roadmap>(`${this.baseUrl}/roadmap`);
  }
}
