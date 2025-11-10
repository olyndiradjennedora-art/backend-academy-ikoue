export interface Location {
  loca_id: string;
  loca_date: string;
  veh_id: string;
  user_id: string;
}

export type CreateLocationInput = Location;

export type UpdateLocationInput = Partial<Omit<Location, 'loca_id'>>;

export interface LocationsRepository {
  create(location: CreateLocationInput): Promise<Location>;
  findAll(): Promise<Location[]>;
  findById(locationId: string): Promise<Location | undefined>;
  update(locationId: string, data: UpdateLocationInput): Promise<Location | undefined>;
  delete(locationId: string): Promise<boolean>;
}

