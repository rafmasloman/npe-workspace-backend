import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import clientController from '../controller/client.controller';

const clientRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, clientController.getAllClient);
  router.get('/:id', authToken, checkRole, clientController.getClientDetail);
  router.post('/', authToken, checkRole, clientController.createClient);
  router.put('/:id', authToken, checkRole, clientController.updateClient);
  router.delete('/:id', authToken, checkRole, clientController.deleteClient);

  return router;
};

export default clientRouter;
