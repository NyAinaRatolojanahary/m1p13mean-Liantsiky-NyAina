import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jeton } from '../models/jeton.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JetonService {
  private apiUrl = 'api/jeton'
  constructor(private http : HttpClient) { }

  create(jeton : Jeton) : Observable<Jeton> {
    return this.http.post<Jeton>(this.apiUrl + '/create', jeton);
  }

  getAll(){
    return this.http.get<Jeton[]>( this.apiUrl + '/all');
  }

  getAllPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getNonTraiterPaginated(page: number, limit: number){
    return this.http.get<any>( `${this.apiUrl}/non-traiter?page=${page}&limit=${limit}`);

  }

  traiterDemande(id:string,data : any) {
    return this.http.put(`${this.apiUrl}/traitement-demande?achatId=${id}`,data);

  }

}
