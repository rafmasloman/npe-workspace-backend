import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authController from '../controller/auth.controller';
import authToken from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';

const authRouter = () => {
  const router = Router();

  router.post('/login', authController.login);
  router.post('/register', authController.register);
  router.put(
    '/:id/change-user-password',
    authToken,
    checkRole,
    authController.changeUserPassword,
  );
  router.put(
    '/:id/update-user-account',
    authToken,
    authController.updateUserAccount,
  );

  router.get('/credential', authToken, authController.credential);

  return router;
};

export default authRouter;
