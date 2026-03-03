import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Produit {
    _id: string;
    nom: string;
    prix: number;
    remise: number;
    details?: string;
    images: string;
    stock?: number;
    status?: number;
    categorieId?: any;
    boutiqueId?: any;
    dateCreation?: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private api = inject(ApiService);

    getAll(): Observable<ApiResponse<Produit[]>> {
        return this.api.get<ApiResponse<Produit[]>>('/product');
    }

    getById(id: string): Observable<ApiResponse<Produit>> {
        return this.api.get<ApiResponse<Produit>>(`/product/${id}`);
    }

    getByCategorie(categorieId: string): Observable<ApiResponse<Produit[]>> {
        return this.api.get<ApiResponse<Produit[]>>(`/product/categorie/${categorieId}`);
    }

    getByBoutique(boutiqueId: string): Observable<ApiResponse<Produit[]>> {
        return this.api.get<ApiResponse<Produit[]>>(`/product/boutique/${boutiqueId}`);
    }

    getRandom(): Observable<ApiResponse<Produit[]>> {
      return this.api.get<ApiResponse<Produit[]>>('/product/random');
    }
}
