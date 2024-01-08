import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateProjectRequestParams } from '../interfaces/project.interface';

class ProjectService {
  static async createProject(payload: ICreateProjectRequestParams) {
    try {
      const project = await prisma.project.create({
        data: {
          ...payload,
          price: Number(payload.price),
          clientId: payload.clientId,
          member: {
            connect: payload.memberId?.map((memberId: string) => ({
              id: memberId,
            })),
          },
        },
      });

      return project;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async getAllProject() {
    try {
      const projects = await prisma.project.findMany({
        include: {
          member: {
            select: {
              position: true,
              profilePicture: true,
              user: {
                select: {
                  fullname: true,
                },
              },
            },
          },
          task: {
            select: {
              status: true,
            },
          },
        },
      });

      const taskCompleted = await prisma.task.count({
        where: {
          status: {
            contains: 'Completed',
          },
        },
      });

      console.log('task completed : ', taskCompleted);

      return projects;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async getProjetDetail(id: string) {
    try {
      const project = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!project) {
        throw new NotFoundError('Invalid id project');
      }

      return project;
    } catch (error) {
      throw error;
    }
  }

  static async updateProject(id: string, payload: ICreateProjectRequestParams) {
    try {
      const project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return project;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async deleteProject(id: string) {
    try {
      const project = await prisma.project.delete({
        where: {
          id,
        },
      });

      return project;
    } catch (error) {
      throw error;
    }
  }

  // static async inviteMember(projectId: string, memberId: string, payload: any) {
  //   try {
  //     const member = await prisma.member.findUnique({
  //       where: {
  //         id: memberId,
  //       },
  //     });

  //     if (!member) {
  //       throw new NotFoundError('Member not found');
  //     }

  //     const project = await prisma.project.update({
  //       where: {
  //         id: projectId,
  //       },
  //       data: {
  //         memberId,
  //       },
  //     });

  //     return project;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default ProjectService;
