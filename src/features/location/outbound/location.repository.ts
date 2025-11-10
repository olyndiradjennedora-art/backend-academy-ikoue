import { eq } from 'drizzle-orm';

import db from '../../../db';
import { locationTable } from '../../../db/schema/location';
import type {
  CreateLocationInput,
  Location,
  LocationsRepository,
  UpdateLocationInput,
} from '../domain/location.entity';

export class LocationRepository implements LocationsRepository {
  async create(location: CreateLocationInput): Promise<Location> {
    const [created] = await db.insert(locationTable).values(location).returning();
    if (!created) {
      throw new Error("Échec de la création de la location.");
    }
    return created;
  }

  async findAll(): Promise<Location[]> {
    return db.select().from(locationTable);
  }

  async findById(locationId: string): Promise<Location | undefined> {
    const result = await db
      .select()
      .from(locationTable)
      .where(eq(locationTable.loca_id, locationId));
    return result.at(0);
  }

  async update(locationId: string, data: UpdateLocationInput): Promise<Location | undefined> {
    const [updated] = await db
      .update(locationTable)
      .set(data)
      .where(eq(locationTable.loca_id, locationId))
      .returning();
    return updated ?? undefined;
  }

  async delete(locationId: string): Promise<boolean> {
    const deleted = await db
      .delete(locationTable)
      .where(eq(locationTable.loca_id, locationId))
      .returning();
    return deleted.length > 0;
  }
}

