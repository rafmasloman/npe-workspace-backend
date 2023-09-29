import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import projectController from '../controller/project.controller';

const projectRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, projectController.getAllProject);
  router.get('/:id', authToken, checkRole, projectController.getProjectDetail);
  router.post('/', authToken, checkRole, projectController.createProject);
  router.put('/:id', authToken, checkRole, projectController.updateProject);
  router.delete('/:id', authToken, checkRole, projectController.deleteProject);

  return router;
};

export default projectRouter;
