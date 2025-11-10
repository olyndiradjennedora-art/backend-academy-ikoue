import { eq } from 'drizzle-orm';

import db from '../../../db';
import { vehiculeTable } from '../../../db/schema/vehicule';
import type {
  CreateVehiculeInput,
  UpdateVehiculeInput,
  Vehicule,
  VehiculesRepository,
} from '../domain/vehicule.entity';

export class VehiculeRepository implements VehiculesRepository {
  async create(vehicule: CreateVehiculeInput): Promise<Vehicule> {
    const [created] = await db.insert(vehiculeTable).values(vehicule).returning();
    if (!created) {
      throw new Error('Échec de la création du véhicule.');
    }
    return created;
  }

  async findAll(): Promise<Vehicule[]> {
    return db.select().from(vehiculeTable);
  }

  async findById(vehiculeId: string): Promise<Vehicule | undefined> {
    const result = await db.select().from(vehiculeTable).where(eq(vehiculeTable.veh_id, vehiculeId));
    return result.at(0);
  }

  async update(vehiculeId: string, data: UpdateVehiculeInput): Promise<Vehicule | undefined> {
    const [updated] = await db
      .update(vehiculeTable)
      .set(data)
      .where(eq(vehiculeTable.veh_id, vehiculeId))
      .returning();
    return updated ?? undefined;
  }

  async delete(vehiculeId: string): Promise<boolean> {
    const deleted = await db
      .delete(vehiculeTable)
      .where(eq(vehiculeTable.veh_id, vehiculeId))
      .returning();
    return deleted.length > 0;
  }
}

