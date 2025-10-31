import type { VehiculesRepository, Vehicules } from "../domain/vehicule.entity";


export class vehiculeRepository implements VehiculesRepository {

    private tableau: Vehicules[] = []

    createVehicule(vehicule: Vehicules): Promise<Vehicules> {
        this.tableau.push(vehicule)
        return Promise.resolve(vehicule)
    
    }

    afficherVehicule(): Promise<Vehicules[]> {
        return Promise.resolve(this.tableau)
    }

    rechercherVehicule(id: string): Promise<Vehicules | undefined> {
        const select = this.tableau.find(vehicule => vehicule.id === id);
        return Promise.resolve(select);
    }

    modifierVehicule(id: string, vehicule: Vehicules): Promise<Vehicules> {
        // TODO: implement modification logic later
        const index = this.tableau.findIndex(vehicule => vehicule.id === id);
            if(index === -1) null;
            this.tableau[index] = {...this.tableau[index], ...vehicule};
        return Promise.resolve(vehicule);
    }

    supprimerVehicule(id: string): void {
        const index = this.tableau.findIndex(vehicule => vehicule.id === id)
        if(index === -1) false;
            this.tableau.splice(index, 1);
            true
    }   


}