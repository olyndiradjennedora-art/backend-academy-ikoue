import {strictObject, string, z} from "zod"

export interface Authorisation{
    token : string
}

export type Vehicules = {
    id: string;
    marque: string;
    categorie: string;
    anFabrication: string;
    couleur: string;
    carburant: string;
    nmbrePlace: string;
    statut: string;
    prix: number;
    photo: string;
    descripotion: string;
}

export interface VehiculesRepository{
    createVehicule(vehicule: Vehicules): Promise<Vehicules | undefined>;
    rechercherVehicule(id: string): Promise<Vehicules | undefined>;
    modifierVehicule(id: string, vehicule: Vehicules): Promise<Vehicules>;
    supprimerVehicule(id: string): void;
    afficherVehicule(): Promise<Vehicules[]>;
}

