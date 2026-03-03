import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface ModePaiement {
    _id: string;
    designation: string;
}

@Injectable({
    providedIn: 'root'
})
export class ModePaiementService {
    private api = inject(ApiService);

    getAll(): Observable<ModePaiement[]> {
        return this.api.get<ModePaiement[]>('/modePaiement');
    }
}
