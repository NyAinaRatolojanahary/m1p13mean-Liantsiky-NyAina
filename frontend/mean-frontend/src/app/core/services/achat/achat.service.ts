import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Achat {
  _id: string;
  clientId: string;
  prixTotal: number;
  status: number;
  dateAchat: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  private api = inject(ApiService);

  acheter(items: { produitId: string; quantite: number }[])
    : Observable<ApiResponse<Achat>> {

    return this.api.post<ApiResponse<Achat>>(
      '/buy/acheter',
      { items },
      true
    );
  }

  getAll(): Observable<ApiResponse<Achat[]>> {
    return this.api.get<ApiResponse<Achat[]>>('/buy/history', true);
  }

  getDetails(id: string): Observable<ApiResponse<any[]>> {
    return this.api.get<ApiResponse<any[]>>(`/buy/details/${id}`, true);
  }

  getById(id: string): Observable<ApiResponse<Achat>> {
    return this.api.get<ApiResponse<Achat>>(`/buy/${id}`, true);
  }
}
