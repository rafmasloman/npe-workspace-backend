import { FieldRef } from '@prisma/client/runtime/library';
import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateMilestoneRequestParams } from '../interfaces/milestone.interfaces';
import { StatusProgress } from '../interfaces/task.interface';
import MilestoneUtils from '../utils/milestone.utils';

class MilestoneService {
  static async createMilestone(payload: ICreateMilestoneRequestParams) {
    try {
      const milestone = await prisma.milestone.create({
        data: {
          ...payload,
          projectId: payload.projectId,
          member: {
            connect: payload.member.map((memberId) => ({
              id: memberId,
            })),
          },
          // project: {
          //   connect: {
          //     id: payload.projectId,
          //   },
          // },
        },
      });

      return milestone;
    } catch (error) {
      console.log('milestone error : ', error);

      throw error;
    }
  }

  static async getAllMilestones(name?: string, status?: StatusProgress) {
    try {
      const milestones = await prisma.milestone.findMany({
        include: {
          task: true,
          project: {
            select: {
              projectIcon: true,
              projectName: true,
            },
          },
        },

        where: {
          milestoneName: {
            contains: name,
          },
        },
      });

      return milestones;
    } catch (error) {
      throw error;
    }
  }

  static async getMilestoneById(milestoneId: number) {
    try {
      const milestone = await prisma.milestone.findFirst({
        where: {
          id: milestoneId,
        },
      });

      if (!milestone) {
        throw NotFoundError;
      }

      return milestone;
    } catch (error) {
      throw error;
    }
  }

  static async getMilestonesByProject(projectId: string) {
    try {
      const milestones = await prisma.milestone.findMany({
        where: {
          projectId,
        },
        include: {
          task: {
            select: {
              status: true,
            },
          },
          member: {
            include: {
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          _count: {
            select: {
              task: {
                where: {
                  status: 'COMPLETED',
                },
              },
            },
          },
        },
      });

      if (!milestones) {
        throw NotFoundError;
      }

      const milestonesWithProgress = milestones.map((milestone) => {
        const taskStatus = MilestoneUtils.countAllTaskStatus(milestone.task);

        return {
          ...milestone,
          progress: Math.floor(
            (milestone._count.task / milestone.task.length) * 100,
          ),
          status: MilestoneUtils.generateMilestoneStatusByTask(
            taskStatus,
            milestone.task.length,
          ),
        };
      });

      return milestonesWithProgress;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  static async getMilestonesByMember(memberId: string) {
    try {
      const milestones = await prisma.milestone.findMany({
        where: {
          member: {
            some: {
              id: memberId,
            },
          },
        },
      });

      if (!milestones) {
        throw NotFoundError;
      }

      return milestones;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateMilestone(
    milestoneId: number,
    payload: ICreateMilestoneRequestParams,
  ) {
    try {
      // const getMilestone = await prisma.milestone.findFirst({
      //   where: {
      //     id: milestoneId,
      //   },
      // });

      // if (!getMilestone) {
      //   throw NotFoundError;
      // }

      const milestone = await prisma.milestone.update({
        where: {
          id: milestoneId,
        },
        data: {
          ...payload,
          projectId: payload.projectId,
          member: {
            connect: payload.member.map((memberId) => ({
              id: memberId,
            })),
          },
        },
      });

      return milestone;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async deleteMilestone(milestoneId: number) {
    try {
      const milestone = await prisma.milestone.delete({
        where: {
          id: milestoneId,
        },
      });

      return milestone;
    } catch (error) {
      throw error;
    }
  }
}

export default MilestoneService;
