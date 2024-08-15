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
          projectName: payload.projectName,
          description: payload.description,
          platform: payload.platform,
          projectIcon: payload.projectIcon,
          startedDate: new Date(payload.startedDate!),
          endDate: new Date(payload.endDate!),
          price: Number(payload.price),
          currentPayroll: Number(payload.price),
          clientId: payload.clientId,
          member: {
            connect: memberId?.map((id: string) => ({
              id,
            })),
          },
        },
      });
      console.log('project : ', project);

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
                  priority: true,
                  status: true,
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
                include: {
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
                  project: {
                    select: {
                      projectIcon: true,
                      projectName: true,
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

  static async getProjectMember(projectId: string) {
    try {
      const userProject = await prisma.project.findFirst({
        where: {
          id: projectId,
        },
        select: {
          member: {
            select: {
              id: true,
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
      });

      return userProject;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectMemberPayroll(projectId: string) {
    try {
      // const member = await prisma.member.findMany({
      //   where: {
      //     project: {
      //         every: {
      //           id: projectId
      //         }
      //     }
      //   },
      //   include: {
      //     payroll: {

      //     }
      //   }
      // })

      // console.log('member : ', member.);

      const memberPayroll = await prisma.project.findFirst({
        where: {
          id: projectId,
        },
        select: {
          projectName: true,
          projectIcon: true,
          description: true,
          currentPayroll: true,
          price: true,
          // payroll: {
          //   select: {
          //     id: true,
          //     salary: true,
          //     percent: true,
          //     projectId: true,
          //     memberId: true,
          //     member: {
          //       select: {
          //         id: true,
          //         position: true,
          //         phoneNumber: true,
          //         profilePicture: true,

          //         user: {
          //           select: {
          //             firstname: true,
          //             lastname: true,
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          member: {
            select: {
              id: true,
              position: true,
              phoneNumber: true,
              profilePicture: true,

              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
              payroll: {
                where: {
                  projectId: projectId,
                },
                select: {
                  id: true,
                  salary: true,
                  percent: true,
                  projectId: true,
                  memberId: true,
                },
              },
            },
          },
        },
      });

      return memberPayroll;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberProject(userId: string, projectName?: string) {
    console.log('project name : ', projectName);

    try {
      const userProject = await prisma.member.findFirst({
        where: {
          userId,
        },
        select: {
          project: {
            // where: {
            //   projectName: {
            //     contains: projectName,
            //   },
            // },
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
                  role: true,
                },
              },
            },
          },
          client: {
            select: {
              id: true,
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

      const findProjectPM = project.member.find((pm) => {
        return pm.user?.role === 'PROJECT_MANAGER';
      });

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
        projectManager: findProjectPM,
        progress: projectProgress(),
      };

      return projectResponse;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getProjectByDeadline() {
    try {
      const allProjects = await prisma.project.findMany({
        where: {
          endDate: {
            gte: new Date(),
          },
        },
      });
    } catch (error) {
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
          projectName: payload.projectName,
          projectIcon: payload.projectIcon,
          description: payload.description,
          platform: payload.platform,
          startedDate: new Date(payload.startedDate!),
          endDate: new Date(payload.endDate!),
          price: Number(payload.price),
          currentPayroll: Number(payload.price),
          client: {
            connect: {
              id: payload.clientId,
            },
          },
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

      const projectDetail = await prisma.project.findFirst({
        where: {
          id,
        },
        include: {
          member: true,
        },
      });

      // if(!projectDetail) {
      //   throw Error('Not Found Project')
      // }

      // const deleteMemberFromProject = await prisma.project.update({
      //   where : {
      //     id
      //   },
      //   data: {
      //     member: {
      //       disconnect: projectDetail.member.map(m => m.id)
      //     }
      //   }
      // })

      return project;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }
}

export default ProjectService;
