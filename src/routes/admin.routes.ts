import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';

const adminRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, adminController.getAllUsers);
  router.post('/', authToken, checkRole, adminController.createUser);
  router.put('/:id', authToken, checkRole, adminController.updateUser);
  router.get('/roles', authToken, checkRole, adminController.getAllRoles);
  router.get('/:id', authToken, checkRole, adminController.getDetailUser);
  router.delete('/:id', authToken, checkRole, adminController.deleteUser);

  return router;
};

export default adminRouter;
