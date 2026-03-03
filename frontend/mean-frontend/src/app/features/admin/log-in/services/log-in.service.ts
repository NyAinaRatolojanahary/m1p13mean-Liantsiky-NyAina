import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private apiUrl = 'api/auth';

  constructor(private http : HttpClient){};

  login(credentials : Login) : Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', credentials)
  }
}