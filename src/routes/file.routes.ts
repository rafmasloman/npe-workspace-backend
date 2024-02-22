import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import fileController from '../controller/file.controller';

const fileRouter = () => {
  const router = Router();

  router.get(
    '/download/:imageFolder/:imageName',

    fileController.downloadImage,
  );

  router.get(
    '/download/:imageFolder/:iconName',

    fileController.downloadIcon,
  );

  return router;
};

export default fileRouter;
