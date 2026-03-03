import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface User {
  _id?: string;
  prenom: string;
  nom?: string;
  email?: string;
  address?: string;
  adresse?: string;
  telephone?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: ApiService;
  private isAuthenticated = signal<boolean>(false);
  public isAuthenticated$ = computed(() => this.isAuthenticated());

  private currentUser = signal<User | null>(null);
  public currentUser$ = computed(() => this.currentUser());

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    api: ApiService
  ) {
    this.api = api;
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');

      this.isAuthenticated.set(!!token);
      if (userStr) {
        try {
          this.currentUser.set(JSON.parse(userStr));
        } catch (e) {
          console.error("Could not parse user from local storage", e);
        }
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('/auth/login', { email, password }).pipe(
      tap((res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
        this.currentUser.set(res.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.api.post<any>('/auth/register', userData);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}
