import type { CreateLocationInput, UpdateLocationInput, Location, LocationsRepository } from "../domain/location.entity";
import { LocationService } from "../domain/location.service";
import { createApp } from "../../../app/app";

export class InMemoryLocationRepository implements LocationsRepository {
    private readonly items = new Map<string, Location>();

    async create(location: CreateLocationInput): Promise<Location> {
        this.items.set(location.loca_id, location);
        return location;
    }

    async findAll(): Promise<Location[]> {
       return Array.from(this.items.values());
    }

    async findById(locationId: string): Promise<Location | undefined> {
        return Array.from(this.items.values()).find((items) => items.loca_id === locationId);
    }

    async update(locationId: string, data: UpdateLocationInput): Promise<Location | undefined> {
        const existing = this.items.get(locationId);
        if (!existing) {
            return undefined;
        }
        const updated: Location = {...existing, ...data, loca_id:locationId}
        this.items.set(locationId, updated);
        return updated;
    }

    async delete(locationId: string): Promise<boolean> {
        return this.items.delete(locationId);
    }
}

const createNullLocationRepository = (): LocationsRepository => ({
    async create(_data: CreateLocationInput): Promise<Location> {
        throw new Error('Méthode non supporté dans ce contexte');
    },
    async findAll(): Promise<Location[]> {
        return [];
    },
    async findById(): Promise<Location | undefined> {
        return undefined;
    },
    async update(locationId: string, _data: UpdateLocationInput): Promise<Location | undefined> {
        throw new Error('Méthode non supporté dans ce contexte');
    },
    async delete(locationId: string): Promise<boolean> {
        throw new Error('Méthode non supporté dans ce contexte');
    }
});

const buildTestApp = (locationRepository: LocationsRepository) => {
    const locationService = new LocationService(locationRepository);
    return createApp({locationService: locationService});
};
