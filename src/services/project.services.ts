import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateProjectRequestParams } from '../interfaces/project.interface';

class ProjectService {
  static async createProject(payload: ICreateProjectRequestParams) {
    let memberId: any = payload.member?.slice(0, payload.member.length);
    memberId = memberId.split(',');
    memberId.map((id: string) => console.log(id));

    console.log('member : ', memberId);

    try {
      const project = await prisma.project.create({
        data: {
          ...(payload as any),
          price: Number(payload.price),
          member: {
            connect: memberId?.map((id: string) => ({
              id,
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
              name: true,
              endDate: true,
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

  static async getProjetDetail(id: string, status?: string) {
    try {
      const project = await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
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
      let memberId: any = payload.member?.slice(1, -1);
      memberId = memberId?.split(',');
      memberId.map((id: string) => console.log(id));

      const project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          ...(payload as any),
          price: Number(payload.price),
          member: {
            connect: memberId?.map((id: string) => ({
              id,
            })),
          },
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
