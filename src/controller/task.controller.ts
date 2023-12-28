import { NextFunction, Request, Response } from 'express';
import TaskService from '../services/task.services';
import { HttpStatusCode } from '../constants/responses.constant';

const TaskController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const task = await TaskService.createTask(payload);

      return task;
    } catch (error) {
      next(error);
    }
  },

  getAllTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await TaskService.getAllTask();

      console.log('tasks : ', tasks);

      return res.json({
        message: 'Berhasil mendapatkan semua data task',
        statusCode: HttpStatusCode.OK,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  getTaskDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const task = await TaskService.getTaskDetail(id);

      return task;
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const task = await TaskService.updateTask(Number(id), payload);

      return task;
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const task = await TaskService.deleteTask(Number(id));

      return task;
    } catch (error) {
      next(error);
    }
  },
};

export default TaskController;
