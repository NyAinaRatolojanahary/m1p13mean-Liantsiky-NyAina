import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_BASE_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private baseUrl = API_BASE_URL;

    private getHeaders(withAuth = false): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (withAuth && typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return headers;
    }

    get<T>(path: string, withAuth = false): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${path}`, { headers: this.getHeaders(withAuth) });
    }

    post<T>(path: string, body: any, withAuth = false): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers: this.getHeaders(withAuth) });
    }

    put<T>(path: string, body: any, withAuth = false): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${path}`, body, { headers: this.getHeaders(withAuth) });
    }
}
