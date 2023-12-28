import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import memberController from '../controller/member.controller';

const memberRouter = () => {
  const router = Router();

  router.get('/', authToken, checkRole, memberController.getAllMember);
  router.get('/:id', authToken, checkRole, memberController.getMemberDetail);
  router.post('/', authToken, checkRole, memberController.createMember);
  router.put('/:id', authToken, checkRole, memberController.updateMember);
  router.delete('/:id', authToken, checkRole, memberController.deleteMember);

  return router;
};

export default memberRouter;
