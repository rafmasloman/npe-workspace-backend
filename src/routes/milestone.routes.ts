import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import milestoneController from '../controller/milestone.controller';

const milestoneRouter = () => {
  const router = Router();

  router.get('/', authToken, milestoneController.getAllMilestones);
  router.post('/', authToken, milestoneController.createMilestone);
  router.get('/:id', authToken, milestoneController.getMilestoneById);
  router.get(
    '/project/:id',
    authToken,
    milestoneController.getMilestoneByProject,
  );
  router.get(
    '/member/:memberId',
    authToken,
    milestoneController.getMilestonesByMember,
  );
  router.put('/:id', authToken, milestoneController.updateMilestone);
  router.delete('/:id', authToken, milestoneController.deleteMilestone);

  return router;
};

export default milestoneRouter;
