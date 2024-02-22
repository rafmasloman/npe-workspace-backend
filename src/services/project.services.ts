import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateProjectRequestParams } from '../interfaces/project.interface';
import moment from 'moment';

class ProjectService {
  static async createProject(payload: ICreateProjectRequestParams) {
    let memberId: any = payload.member?.slice(0, payload.member.length);
    memberId = memberId.split(',');
    // memberId.map((id: string) => console.log(id));

    try {
      const project = await prisma.project.create({
        data: {
          ...(payload as any),
          startedDate: new Date(payload.startedDate!),
          endDate: new Date(payload.endDate!),
          price: Number(payload.price),
          currentPayroll: Number(payload.price),

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

  static async getAllProject(limit?: number, searchTerm?: string) {
    try {
      const projects = await prisma.project.findMany({
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
                      firstname: true,
                      lastname: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          projectName: {
            contains: searchTerm,
          },
        },
        take: limit ? limit : undefined,
      });

      return projects;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async getProjectByMember(userId: string) {
    try {
      const userProject = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          member: {
            select: {
              id: true,
              project: {
                select: {
                  id: true,
                  projectIcon: true,
                  description: true,
                  projectName: true,
                  platform: true,
                  endDate: true,
                  member: {
                    select: {
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
                take: 3,
              },
              task: {
                select: {
                  name: true,
                  project: {
                    select: {
                      projectName: true,
                      projectIcon: true,
                    },
                  },
                },
                take: 2,
              },
              milestone: {
                select: {
                  member: {
                    select: {
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
                take: 2,
              },
            },
          },
        },
      });

      return userProject;
    } catch (error) {
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
      let memberId: any = payload.member?.slice(0, payload.member.length);

      console.log('member id : ', memberId);

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
      console.log('error : ', error);

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
