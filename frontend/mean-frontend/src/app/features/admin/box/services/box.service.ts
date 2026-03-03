import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Box } from '../models/box.model';
import { Observable } from 'rxjs';
import { ContratBox } from '../models/contratBox.model';

@Injectable({
  providedIn: 'root'
})

export class BoxService {
  constructor(private http: HttpClient) { }
  
  private apiUrl ='/api/box';


  create(box: Box): Observable<Box> {
    return this.http.post<Box>(this.apiUrl + '/create', box);
  }

  getAll() {
    var result = null;
    result = this.http.get<Box[]>( this.apiUrl + '/all');
    return result;
  }
  
  getAllPaginated(page: number, limit: number) {
    return this.http.get<any>( `${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  updateLoyer(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  
  createContrat(contratBox : ContratBox) : Observable<ContratBox> {
    return this.http.post<ContratBox>(this.apiUrl + '/contrat/create', contratBox);
  }
}

  
