import { Router } from 'express';

import { LocationService } from './domain/location.service';
import { LocationController } from './inbound/location.controller';

export const createLocationRouter = (service: LocationService) => {
  const controller = new LocationController(service);
  const router = Router();

  router.post('/', controller.create);
  router.get('/', controller.findAll);
  router.get('/:loca_id', controller.findById);
  router.put('/:loca_id', controller.update);
  router.delete('/:loca_id', controller.delete);

  return router;
};

