import { NextFunction, Request, Response } from 'express';
import TaskService from '../services/task.services';
import { HttpStatusCode } from '../constants/responses.constant';
import { ICreateTaskRequestParams } from '../interfaces/task.interface';

const TaskController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, projectId, member, milestoneId, status } = req.body;
      const task = await TaskService.createTask({
        name,
        projectId,
        member,
        status,
      } as ICreateTaskRequestParams);

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

  getTasksByProject: async (
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

      return task;
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { name, projectId, member, milestoneId, status } = req.body;

      const task = await TaskService.updateTask(Number(id), {
        name,
        projectId,
        member,
        milestoneId,
        status,
      } as ICreateTaskRequestParams);

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
