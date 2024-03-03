import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateProjectRequestParams } from '../interfaces/project.interface';
import moment from 'moment';
import ProgressUtils from '../utils/progress.utils';

class ProjectService {
  static async createProject(payload: ICreateProjectRequestParams) {
    try {
      let memberId: any = payload.member?.slice(0, payload.member.length);
      memberId = memberId.split(',');
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

  static async getUserProject(userId: string) {
    try {
      const userProject = await prisma.member.findFirst({
        where: {
          userId,
        },
        select: {
          project: {
            select: {
              id: true,
              projectName: true,
              projectIcon: true,
              description: true,
              endDate: true,
              platform: true,
              task: {
                select: {
                  id: true,
                  status: true,
                },
              },
              milestone: {
                select: {
                  id: true,
                },
              },
              member: {
                select: {
                  profilePicture: true,
                  position: true,
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
      });

      return userProject;
    } catch (error) {
      console.log('error : ', error);
      throw error;
    }
  }

  static async getProjetDetail(id: string, status?: string) {
    try {
      const project = await prisma.project.findFirst({
        where: {
          id,
        },
        include: {
          member: {
            select: {
              id: true,
              position: true,
              profilePicture: true,
              user: {
                select: {
                  id: true,
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          client: {
            select: {
              name: true,
              phoneNumber: true,
              address: true,
            },
          },
          task: true,
        },
      });

      if (!project) {
        throw new NotFoundError('Invalid id project');
      }

      const projectProgress = () => {
        const countProjectTaskStatus = ProgressUtils.countAllTaskStatus(
          project.task,
        );
        const generateProgress = Math.floor(
          (countProjectTaskStatus.completed / project.task.length) * 100,
        );

        return generateProgress;
      };

      const projectResponse = {
        ...project,
        progress: projectProgress(),
      };

      return projectResponse;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateProject(id: string, payload: ICreateProjectRequestParams) {
    let memberId: any = payload.member?.slice(0, payload.member.length);
    memberId = memberId.split(',');

    try {
      const project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          ...payload,

          price: Number(payload.price),
          currentPayroll: Number(payload.price),
          startedDate: new Date(payload.startedDate!),
          endDate: new Date(payload.endDate!),

          member: {
            connect: memberId?.map((id: string) => ({
              id,
            })),
          },
          clientId: payload.clientId,
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
}

export default ProjectService;
