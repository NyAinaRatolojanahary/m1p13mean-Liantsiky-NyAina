import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boutique } from '../models/boutique.model';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private apiUrl ='/api/shop';
  constructor(private http: HttpClient) { }

  create(boutique : Boutique) {
    return this.http.post(this.apiUrl + '/create', boutique);
  }

  getAllPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getAll() {
    var result = null;
    result = this.http.get<Boutique[]>( this.apiUrl + '/all');
    return result;
  }
}
