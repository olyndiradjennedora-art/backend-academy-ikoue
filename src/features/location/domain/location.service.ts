import type {
  CreateLocationInput,
  Location,
  LocationsRepository,
  UpdateLocationInput,
} from './location.entity';

export class LocationService {
  constructor(private readonly repository: LocationsRepository) {}

  async create(location: CreateLocationInput): Promise<Location> {
    return this.repository.create(location);
  }

  async getAll(): Promise<Location[]> {
    return this.repository.findAll();
  }

  async findById(locationId: string): Promise<Location | undefined> {
    return this.repository.findById(locationId);
  }

  async update(locationId: string, data: UpdateLocationInput): Promise<Location> {
    const updated = await this.repository.update(locationId, data);
    if (!updated) {
      throw new Error('La location demandée est introuvable.');
    }
    return updated;
  }

  async delete(locationId: string): Promise<void> {
    const deleted = await this.repository.delete(locationId);
    if (!deleted) {
      throw new Error("Aucune location n'a été supprimée.");
    }
  }
}

