import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Categorie {
    _id: string;
    nom: string;
    image?: string;
    status?: number;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class CategorieService {
    private api = inject(ApiService);

    getAll(): Observable<ApiResponse<Categorie[]>> {
        return this.api.get<ApiResponse<Categorie[]>>('/product-category');
    }

    getById(id: string): Observable<ApiResponse<Categorie>> {
        return this.api.get<ApiResponse<Categorie>>(`/product-category/${id}`);
    }
}
