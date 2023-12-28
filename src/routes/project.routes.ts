import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import projectController from '../controller/project.controller';
import multerConfig from '../libs/multer.libs';

const projectRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, projectController.getAllProject);
  router.get('/:id', authToken, checkRole, projectController.getProjectDetail);
  router.post(
    '/',
    authToken,
    // checkRole,
    multerConfig('projects').fields([
      {
        name: 'image',
        maxCount: 4,
      },
      {
        name: 'projectIcon',
        maxCount: 1,
      },
    ]),
    projectController.createProject,
  );
  router.put(
    '/:id',
    authToken,
    checkRole,
    multerConfig('projects').single('image'),

    projectController.updateProject,
  );
  router.delete('/:id', authToken, checkRole, projectController.deleteProject);

  return router;
};

export default projectRouter;