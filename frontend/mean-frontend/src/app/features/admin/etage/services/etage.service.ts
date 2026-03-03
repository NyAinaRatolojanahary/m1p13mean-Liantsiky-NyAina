import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etage } from '../models/etage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtageService {
  private apiUrl = '/api/etage';

  constructor(private http: HttpClient) {}

  create(etage: Etage): Observable<Etage> {
    return this.http.post<Etage>(this.apiUrl + '/create', etage);
  }

  getAll() {
    var result = null;
    result = this.http.get<Etage[]>( this.apiUrl + '/all');
    return result;
  }

  getAllPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}