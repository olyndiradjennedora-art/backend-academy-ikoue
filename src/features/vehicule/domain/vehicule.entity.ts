export interface Vehicule {
  veh_id: string;
  veh_marque: string;
  veh_categorie: string;
  veh_anFabri: string;
  veh_couleur: string;
  veh_carburant: string;
  veh_nmbrePlace: string;
  veh_statut: string;
  veh_prix: number;
  veh_photo: string;
  veh_description: string;
}

export type CreateVehiculeInput = Vehicule;

export type UpdateVehiculeInput = Partial<Omit<Vehicule, 'veh_id'>>;

export interface VehiculesRepository {
  create(vehicule: CreateVehiculeInput): Promise<Vehicule>;
  findAll(): Promise<Vehicule[]>;
  findById(vehiculeId: string): Promise<Vehicule | undefined>;
  update(vehiculeId: string, data: UpdateVehiculeInput): Promise<Vehicule | undefined>;
  delete(vehiculeId: string): Promise<boolean>;
}

