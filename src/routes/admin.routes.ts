import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';

const adminRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, adminController.getAllUsers);
  router.post('/', adminController.createUser);
  router.get('/roles', adminController.getAllRoles);
  router.get('/:id', adminController.getDetailUser);

  return router;
};

export default adminRouter;
