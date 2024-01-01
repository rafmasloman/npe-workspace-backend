import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateMilestoneRequestParams } from '../interfaces/milestone.interfaces';

class MilestoneService {
  static async createMilestone(payload: ICreateMilestoneRequestParams) {
    try {
      const milestone = await prisma.milestone.create({
        data: {
          ...payload,
          projectId: payload.projectId,
        },
      });

      return milestone;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMilestones() {
    try {
      const milestones = await prisma.milestone.findMany();

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

  static async updateMilestone(
    milestoneId: number,
    payload: ICreateMilestoneRequestParams,
  ) {
    try {
      const getMilestone = await prisma.milestone.findFirst({
        where: {
          id: milestoneId,
        },
      });

      if (!getMilestone) {
        throw NotFoundError;
      }

      const milestone = await prisma.milestone.update({
        where: {
          id: milestoneId,
        },
        data: {
          ...payload,
          projectId: payload.projectId,
        },
      });

      return milestone;
    } catch (error) {
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
