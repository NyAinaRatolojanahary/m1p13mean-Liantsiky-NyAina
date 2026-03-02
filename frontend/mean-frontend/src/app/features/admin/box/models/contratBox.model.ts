import { Box } from "../models/box.model";
import { Boutique } from "../../boutique/models/boutique.model";
import { StatusContrat } from "./statusContrat.model";

export interface ContratBox {
    _id?: string;
    boxId: string | Box;
    boutiqueId: string | Boutique;
    dateDebut: Date;
    dateFin: Date;
    loyer?: number;
    status? : string | StatusContrat;
}