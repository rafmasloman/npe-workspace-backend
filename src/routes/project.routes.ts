import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import { checkRole, checkRolePM } from '../middleware/role.middleware';
import projectController from '../controller/project.controller';
import multerConfig from '../libs/multer.libs';

const projectRouter = () => {
  const router = Router();

  router.get('/', authToken, projectController.getAllProject);
  router.get('/:id', authToken, projectController.getProjectDetail);
  router.get('/user/:id', authToken, projectController.getUserProject);
  router.get('/member/:id', authToken, projectController.getMemberProject);
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

  router.post(
    '/inviteMember',
    authToken,
    checkRolePM,
    projectController.inviteMember,
  );

  router.put(
    '/:id',
    authToken,
    checkRolePM,
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

    projectController.updateProject,
  );

  router.delete(
    '/removeMember/:id',
    authToken,
    checkRolePM,
    projectController.deleteMemberFromProject,
  );

  router.delete('/:id', authToken, checkRole, projectController.deleteProject);

  return router;
};

export default projectRouter;
