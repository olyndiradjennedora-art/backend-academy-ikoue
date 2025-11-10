import type {
  CreateVehiculeInput,
  UpdateVehiculeInput,
  Vehicule,
  VehiculesRepository,
} from './vehicule.entity';

export class VehiculeService {
  constructor(private readonly repository: VehiculesRepository) {}

  async create(vehicule: CreateVehiculeInput): Promise<Vehicule> {
    return this.repository.create(vehicule);
  }

  async getAll(): Promise<Vehicule[]> {
    return this.repository.findAll();
  }

  async findById(vehiculeId: string): Promise<Vehicule | undefined> {
    return this.repository.findById(vehiculeId);
  }

  async update(vehiculeId: string, data: UpdateVehiculeInput): Promise<Vehicule> {
    const updated = await this.repository.update(vehiculeId, data);
    if (!updated) {
      throw new Error("Le véhicule demandé est introuvable.");
    }
    return updated;
  }

  async delete(vehiculeId: string): Promise<void> {
    const deleted = await this.repository.delete(vehiculeId);
    if (!deleted) {
      throw new Error('Aucun véhicule à supprimer.');
    }
  }
}

