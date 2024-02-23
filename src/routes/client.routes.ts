import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import clientController from '../controller/client.controller';
import { checkRole, checkRolePM } from '../middleware/role.middleware';

const clientRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRolePM, clientController.getAllClient);
  router.get('/:id', authToken, checkRolePM, clientController.getClientDetail);
  router.post('/', authToken, checkRolePM, clientController.createClient);
  router.put('/:id', authToken, checkRolePM, clientController.updateClient);
  router.delete('/:id', authToken, checkRolePM, clientController.deleteClient);

  return router;
};

export default clientRouter;
