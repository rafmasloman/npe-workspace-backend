import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateTaskRequestParams } from '../interfaces/task.interface';

class TaskService {
  static async createTask(payload: ICreateTaskRequestParams) {
    console.log('task : ', payload);

    try {
      const task = await prisma.task.create({
        data: {
          ...payload,

          member: {
            connect: payload.member.map((memberId: string) => ({
              id: memberId,
            })),
          },
          projectId: payload.projectId,
          milestoneId: payload.milestoneId,
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTask(
    name?: string,
    status?: any,
    priority?: any,
    projectName?: string,
  ) {
    try {
      const tasks = await prisma.task.findMany({
        // include: {
        //   project: true,
        //   member: {
        //     include: {
        //       user: true,
        //     },
        //   },
        //   milestone: true,
        // },

        where: {
          name: {
            contains: name,
          },
          status: {
            contains: status,
          },
          priority: {
            equals: priority,
          },
          project: {
            projectName: {
              contains: projectName,
            },
          },
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
          comment: {
            select: {
              message: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
                include: {
                  member: {
                    select: {
                      profilePicture: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!task) {
        throw new NotFoundError('Task tidak ditemukan');
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getTasksByProjectStatus(
    projectId: string,
    status?: 'TODO' | 'ON_PROGRESS' | 'COMPLETED',
  ) {
    try {
      const task = await prisma.task.findMany({
        where: {
          project: {
            id: projectId,
          },
          status,
        },
        include: {
          member: {
            select: {
              position: true,
              profilePicture: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          // comment: {
          //   include: {
          //     user: {
          //       select: {
          //         firstname: true,
          // lastname: true,
          //         member: {
          //           select: {
          //             profilePicture: true,
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          comment: {
            select: {
              id: true,
            },
          },
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getTaskByProjectId(projectId: string) {
    try {
      const task = await prisma.task.findMany({
        where: {
          projectId,
        },
        include: {
          member: true,
          comment: true,
        },
      });

      return task;
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
          member: {
            connect: payload.member?.map((memberId: string) => ({
              id: memberId,
            })),
          },
          projectId: payload.projectId,
          milestoneId: payload.milestoneId,
        },
      });

      return task;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateTaskStatus(id: number, status: string) {
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
          status,
        },
      });

      return task;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export default TaskService;
