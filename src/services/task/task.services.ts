import prisma from '../../config/prisma-client.config';
import NotFoundError from '../../error/not-found.error';
import { ICreateTaskRequestParams } from '../../interfaces/task.interface';
import TaskMemberService from './taskOnMember';

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

      const milestone = await prisma.milestone.update({
        where: {
          id: payload.milestoneId,
        },
        data: {
          member: {
            connect: payload.member.map((memberId: string) => ({
              id: memberId,
            })),
          },
        },
      });

      return task;
    } catch (error) {
      console.log('error : ', error);

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
      const task = await prisma.task.findFirst({
        where: {
          id,
        },
        include: {
          project: {
            select: {
              id: true,
              projectIcon: true,
              projectName: true,
              image: true,
            },
          },
          milestone: {
            select: {
              id: true,
              milestoneName: true,
            },
          },
          comment: {
            select: {
              message: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                  member: {
                    select: {
                      profilePicture: true,
                    },
                  },
                },
              },
            },
          },
          member: {
            select: {
              id: true,
              profilePicture: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
        },
      });

      return task;
    } catch (error) {
      console.log('error : ', error);

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
          milestone: {
            select: {
              milestoneName: true,
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
      const findTask = await prisma.task.findFirst({
        where: {
          id,
        },
        select: {
          member: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!findTask) {
        throw new NotFoundError('Task tidak ditemukan');
      }

      const taskMember = await TaskMemberService.removeMemberFromTask(
        id,
        findTask,
      );

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
        include: {
          member: true,
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
