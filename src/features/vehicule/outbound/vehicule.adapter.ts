import type { CreateVehiculeInput, UpdateVehiculeInput, Vehicule, VehiculesRepository } from "../domain/vehicule.entity";
import { VehiculeService } from "../domain/vehicule.service";
import { createApp } from "../../../app/app";

export class InMemoryVehiculeRepository implements VehiculesRepository {
    private readonly items = new Map<string, Vehicule>();

    async create(vehicule: CreateVehiculeInput): Promise<Vehicule> {
        this.items.set(vehicule.veh_id, vehicule);
        return vehicule;
    }

    async findAll(): Promise<Vehicule[]> {
        return Array.from(this.items.values());
    }

    async findById(vehiculeId: string): Promise<Vehicule | undefined> {
        return this.items.get(vehiculeId);
    }

    async update(vehiculeId: string, data: UpdateVehiculeInput): Promise<Vehicule | undefined> {
        const existing = this.items.get(vehiculeId);
        if (!existing) {
            return undefined;
        }
        const updated: Vehicule = { ...existing, ...data, veh_id: vehiculeId };
        this.items.set(vehiculeId, updated);
        return updated;
    }

    async delete(vehiculeId: string): Promise<boolean> {
        return this.items.delete(vehiculeId);
    }
}

const createNullVehiculeRepository = (): VehiculesRepository => ({
   async create(_data: CreateVehiculeInput): Promise<Vehicule> {
    throw new Error('Méthode non supportée dans ce contexte.');
   },
   async findAll(): Promise<Vehicule[]> {
    return [];
   },
   async findById(vehiculeId: string): Promise<Vehicule | undefined> {
    return undefined;
   },
   async update(vehiculeId: string, data: UpdateVehiculeInput): Promise<Vehicule | undefined> {
    throw new Error('Méthode non supportée dans ce contexte.');
   },
   async delete(vehiculeId: string): Promise<boolean> {
    throw new Error('Méthode non supportée dans ce contexte.');
   },
});

const buildTestApp = (vehiculeRepository: VehiculesRepository) => {
    const vehiculeService = new VehiculeService(vehiculeRepository);
    return createApp({ vehiculeService: vehiculeService });
};