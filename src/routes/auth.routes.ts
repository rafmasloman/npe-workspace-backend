import { Router } from 'express';
import adminController from '../controller/admin.controller';
import authController from '../controller/auth.controller';
import authToken from '../middleware/auth.middleware';

const authRouter = () => {
  const router = Router();

  router.post('/login', authController.login);
  router.post('/register', authController.register);

  router.get('/credential', authToken, authController.credential);

  return router;
};

export default authRouter;
