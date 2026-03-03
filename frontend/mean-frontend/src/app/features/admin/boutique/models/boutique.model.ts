import { Box } from "../../box/models/box.model";
import { ShopUser } from "../../shopUser/models/shopUser.model";

export interface Boutique {
    _id?: string;
    nom: string;
    description: string;
    proprietaireId: string | ShopUser;
    dateCreation: Date;
    boxId? : string | Box;
    status?: number;
}