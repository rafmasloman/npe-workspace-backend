import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateTaskRequestParams } from '../interfaces/task.interface';

class TaskService {
  static async createTask(payload: ICreateTaskRequestParams) {
    try {
      const task = await prisma.task.create({
        data: {
          ...payload,
          project: {
            connect: {
              id: payload.projectId,
            },
          },
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTask() {
    try {
      const tasks = await prisma.task.findMany({
        include: {
          project: true,
          assignMember: true,
        },
      });

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async getTaskDetail(id: number) {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id,
        },
        include: {
          project: {
            select: {
              projectName: true,
              image: true,
            },
          },
        },
      });

      if (!task) {
        throw new NotFoundError('Task tidak ditemukan');
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(id: number) {
    try {
      const findTask = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!findTask) {
        throw new NotFoundError('Task tidak ditemukan');
      }

      const task = await prisma.task.delete({
        where: {
          id,
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(id: number, payload: ICreateTaskRequestParams) {
    try {
      const findTask = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!findTask) {
        throw new NotFoundError('Task tidak ditemukan');
      }

      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;
