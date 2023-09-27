import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authController from '../controller/auth.controller';

const authRouter = () => {
  const router = Router();

  router.post('/login', authController.login);

  return router;
};

export default authRouter;
