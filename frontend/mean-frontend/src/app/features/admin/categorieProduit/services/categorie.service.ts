import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorieProduit } from '../models/categorieProduit.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  private apiUrl ='/api/product-category';

  create(categorie: CategorieProduit) {
    return this.http.post(this.apiUrl + '/create', categorie);
  }

  getAll() {
    var result = null;
    result = this.http.get( this.apiUrl + '/all');
    return result;
  }

  getAllPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}?page=${page}&limit=${limit}`);
  }

}
