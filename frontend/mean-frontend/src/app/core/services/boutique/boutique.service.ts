import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Boutique {
    _id: string;
    nom: string;
    description?: string;
    proprietaireId?: any;
    boxId?: any;
    status?: number;
    dateCreation?: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class BoutiqueService {
    private api = inject(ApiService);

    // Uses the public endpoint (to be added in backend)
    getAll(): Observable<ApiResponse<Boutique[]>> {
        return this.api.get<ApiResponse<Boutique[]>>('/shop/public');
    }

    getById(id: string): Observable<ApiResponse<Boutique>> {
        return this.api.get<ApiResponse<Boutique>>(`/shop/public/${id}`);
    }
}
