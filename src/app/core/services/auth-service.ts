import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { LoginRequest } from '../interfaces/login-request';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // The base URL of the backend server.
  private readonly BASE_URL = 'http://localhost:8080/auth';
  private readonly LOGIN_URL = `${this.BASE_URL}/login`;
  private readonly REGISTER_URL = `${this.BASE_URL}/register`;
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  // The current user's information.
  currentUser = signal<User | null>(null);

  // Inject the HttpClient to make HTTP requests, and router to redirect
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const token = this.getToken();
    if (token) {
      // If a token exists, decode it to get user info
      const decodedUser: User = jwtDecode(token);
      this.setCurrentUser(decodedUser);
    }
  }

  // The register method sends user registration data to the server.
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.REGISTER_URL}`, request).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          const decodedUser: User = jwtDecode(response.token);
          this.setCurrentUser(decodedUser);
        }
      }),
    );
  }

  // The login method sends user credentials to the server to obtain a JWT.
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.LOGIN_URL, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          const decodedUser: User = jwtDecode(response.token);
          this.setCurrentUser(decodedUser);
        }
      }),
    );
  }

  // Retrieves the stored JWT from local storage.
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Stores the JWT in the browser's Local Storage.
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Sets the current user and stores their information in local storage.
  setCurrentUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Checks for the presence of a token to determine login status.
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  //Removes the token and logs the user out.
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/landing']);
  }
}
