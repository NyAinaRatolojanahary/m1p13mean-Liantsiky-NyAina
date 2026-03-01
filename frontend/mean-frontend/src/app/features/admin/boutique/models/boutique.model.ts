import { Box } from "../../box/models/box.model";
import { ShopUser } from "../../shopUser/models/shopUser.model";

export interface Boutique {
    _id?: string;
    nom: string;
    description: string;
    proprietaire: string | ShopUser;
    dateCreation: Date;
    box : string | Box;
    status?: number;
}