import { Etage } from "../../etage/models/etage.model";

export interface Box {
    _id?: string;
    nom: string;
    espacem2: number;
    loyer : number;
    etageid?: string | Etage; // Add etageid to Box model
}