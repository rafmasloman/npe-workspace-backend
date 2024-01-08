import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import commentController from '../controller/comment.controller';

const commentRouter = () => {
  const router = Router();

  router.get('/', authToken, commentController.getAllComments);
  router.post('/', authToken, commentController.createComment);

  return router;
};

export default commentRouter;
