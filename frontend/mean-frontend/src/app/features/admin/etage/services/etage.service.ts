import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etage } from '../models/etage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtageService {

  private apiUrl = 'http://localhost:3000/etage';

  constructor(private http: HttpClient) {}

  create(etage: Etage): Observable<Etage> {
    return this.http.post<Etage>(this.apiUrl + '/create', etage);
  }
}