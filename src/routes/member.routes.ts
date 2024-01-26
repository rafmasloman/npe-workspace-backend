import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import checkRole from '../middleware/role.middleware';
import memberController from '../controller/member.controller';
import multerConfig from '../libs/multer.libs';

const memberRouter = () => {
  const router = Router();

  router.get('/', authToken, memberController.getAllMember);
  router.get(
    '/projects/:id',
    authToken,
    // checkRole,
    memberController.getMembersProject,
  );

  router.get('/:id', authToken, memberController.getMemberDetail);

  router.post(
    '/',
    authToken,
    multerConfig('members').single('profilePicture'),
    memberController.createMember,
  );
  router.put(
    '/:id',
    authToken,
    checkRole,
    multerConfig('members').single('profilePicture'),
    memberController.updateMember,
  );
  router.delete('/:id', authToken, checkRole, memberController.deleteMember);

  return router;
};

export default memberRouter;
