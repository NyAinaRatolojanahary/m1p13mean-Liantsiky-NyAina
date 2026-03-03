import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModePaiement } from '../models/modePaiement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {
  private apiUrl = 'api/modePaiement'
  constructor(private http: HttpClient) { }

  create(modePaiement : ModePaiement) : Observable<ModePaiement> {
    return this.http.post<ModePaiement>(this.apiUrl + '/create', modePaiement);
  
  }

  getAll() {
    return this.http.get<ModePaiement[]>( this.apiUrl + '/all');
  }
}

