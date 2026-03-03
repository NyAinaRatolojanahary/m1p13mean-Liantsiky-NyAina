import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Jeton {
    _id: string;
    nom: string;
    montant: number;
    status: any;
}

export interface AchatJeton {
    _id: string;
    clientId: string;
    modePaiementId: any;
    referenceVirement: string;
    dateDemande: string;
    montantTotal: number;
    status: any;
    jetons: any[];
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class JetonService {
    private api = inject(ApiService);

    getJetonsDisponible(): Observable<Jeton[]> {
        return this.api.get<Jeton[]>('/jeton/all');
    }

    acheterJeton(data: any): Observable<ApiResponse<AchatJeton>> {
        return this.api.post<ApiResponse<AchatJeton>>('/jeton/buy', data, true);
    }

    getHistoriqueAchats(): Observable<ApiResponse<AchatJeton[]>> {
        return this.api.get<ApiResponse<AchatJeton[]>>('/jeton/history', true);
    }
}
