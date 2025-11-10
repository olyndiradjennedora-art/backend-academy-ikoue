import express from 'express';

import { UserService } from '../features/users/domain/user.service';
import { VehiculeService } from '../features/vehicule/domain/vehicule.service';
import { LocationService } from '../features/location/domain/location.service';
import { UserRepository } from '../features/users/outbound/user.repository';
import { VehiculeRepository } from '../features/vehicule/outbound/vehicule.repository';
import { LocationRepository } from '../features/location/outbound/location.repository';
import { createUserRouter } from '../features/users';
import { createVehiculeRouter } from '../features/vehicule';
import { createLocationRouter } from '../features/location';

export type AppServicesOverrides = {
  userService?: UserService;
  vehiculeService?: VehiculeService;
  locationService?: LocationService;
};

export const createApp = (overrides: AppServicesOverrides = {}) => {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  const userService = overrides.userService ?? new UserService(new UserRepository());
  const vehiculeService =
    overrides.vehiculeService ?? new VehiculeService(new VehiculeRepository());
  const locationService =
    overrides.locationService ?? new LocationService(new LocationRepository());

  void userService.ensurePasswordsAreHashed().catch((error) => {
    console.error('Impossible de mettre à jour les mots de passe existants:', error);
  });

  app.use('/users', createUserRouter(userService));
  app.use('/vehicules', createVehiculeRouter(vehiculeService));
  app.use('/locations', createLocationRouter(locationService));

  return app;
};

export type Application = ReturnType<typeof createApp>;

