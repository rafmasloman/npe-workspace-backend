import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authToken from '../middleware/auth.middleware';
import { checkRole, checkRolePM } from '../middleware/role.middleware';

const adminRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRolePM, adminController.getAllUsers);
  router.post('/', authToken, checkRole, adminController.createUser);
  router.put('/:id', authToken, checkRole, adminController.updateUser);
  router.put(
    '/changePassword/:id',
    authToken,
    checkRole,
    adminController.changeUserPassword,
  );
  router.get('/roles', authToken, checkRole, adminController.getAllRoles);
  router.get('/staff', authToken, checkRolePM, adminController.getUserStaff);
  router.get(
    '/non-member',
    authToken,
    // checkRole,
    adminController.getUserNonMember,
  );
  router.get(
    '/project-manager',
    // authToken,
    // checkRole,
    adminController.getProjectManagerWithNonProject,
  );
  router.get('/:id', authToken, checkRolePM, adminController.getDetailUser);
  router.delete('/:id', authToken, checkRole, adminController.deleteUser);

  return router;
};

export default adminRouter;
