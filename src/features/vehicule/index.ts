import { Router } from 'express';

import { VehiculeService } from './domain/vehicule.service';
import { VehiculeController } from './inbound/vehicule.controller';

export const createVehiculeRouter = (service: VehiculeService) => {
  const controller = new VehiculeController(service);
  const router = Router();

  router.post('/', controller.create);
  router.get('/', controller.findAll);
  router.get('/:veh_id', controller.findById);
  router.put('/:veh_id', controller.update);
  router.delete('/:veh_id', controller.delete);

  return router;
};

