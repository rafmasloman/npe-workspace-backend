import { NextFunction, Request, Response } from 'express';
import TaskService from '../services/task/task.services';
import { HttpStatusCode } from '../constants/responses.constant';
import {
  ICreateTaskRequestParams,
  StatusProgress,
} from '../interfaces/task.interface';

const TaskController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const task = await TaskService.createTask(payload);

      return res.json({
        message: 'Berhasil membuat task',
        statusCode: HttpStatusCode.CREATED,
        data: task,
      });
    } catch (error) {
      console.log('error controller : ', error);

      next(error);
    }
  },

  getAllTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, status, priority, projectName, limit } = req.query;
      const tasks = await TaskService.getAllTask(
        name as string,
        status as string,
        priority as any,
        projectName as string,
        Number(limit),
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data task',
        statusCode: HttpStatusCode.OK,
        data: tasks,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },

  getTasksByProjectStatus: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const projectId = req.params.id;
      const task = await TaskService.getTasksByProjectStatus(projectId);

      return res.json({
        message: 'Berhasil mendapatkan task project',
        statusCode: HttpStatusCode.OK,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  },

  getTaskDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const task = await TaskService.getTaskDetail(id);

      return res.json({
        message: 'Berhasil mendapatkan detail task',
        statusCode: HttpStatusCode.OK,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const task = await TaskService.updateTask(
        Number(id),
        payload as ICreateTaskRequestParams,
      );

      return res.json({
        message: 'Berhasil mengupdate task',
        statusCode: HttpStatusCode.CREATED,
        data: task,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },

  updateStatusTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { status } = req.body;

      console.log('status : ', status);
      console.log('id : ', id);

      const task = await TaskService.updateTaskStatus(Number(id), status);

      return res.json({
        message: 'Berhasil mengupdate status task',
        statusCode: HttpStatusCode.CREATED,
        data: task,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const task = await TaskService.deleteTask(Number(id));

      return res.json({
        message: 'Berhasil menghapus task',
        statusCode: HttpStatusCode.OK,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default TaskController;
