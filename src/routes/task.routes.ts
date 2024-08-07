import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import taskController from '../controller/task.controller';

const taskRouter = () => {
  const router = Router();

  router.get('/', authToken, taskController.getAllTask);
  router.get('/:id', authToken, taskController.getTaskDetail);
  router.get('/project/:id', authToken, taskController.getTasksByProjectStatus);

  router.post('/', authToken, taskController.createTask);
  router.put('/:id', authToken, taskController.updateTask);
  router.put('/status/:id', authToken, taskController.updateStatusTask);
  router.delete('/:id', authToken, taskController.deleteTask);

  return router;
};

export default taskRouter;
