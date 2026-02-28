import { Role } from "./role.model";

export interface ShopUser {
    _id?: string;
    nom: string;
    prenom: string;
    dtn : Date;
    email: string;
    password: string;
    role?: string | Role;
}