import { Router } from 'express';

import { UserService } from './domain/user.service';
import { UserController } from './inbound/user.controller';

export const createUserRouter = (service: UserService) => {
  const controller = new UserController(service);
  const router = Router();

  router.post('/', controller.create);
  router.post('/login', controller.login);
  router.get('/', controller.findAll);
  router.get('/:user_email', controller.findByEmail);
  router.put('/:user_id', controller.update);
  router.delete('/:user_id', controller.delete);

  return router;
};

