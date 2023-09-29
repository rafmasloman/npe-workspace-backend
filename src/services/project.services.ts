import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateProjectRequestParams } from '../interfaces/project.interface';

class ProjectService {
  static async createProject(payload: ICreateProjectRequestParams) {
    try {
      const project = await prisma.project.create({
        data: {
          ...payload,
        },
      });

      return project;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProject() {
    try {
      const projects = await prisma.project.findMany({
        include: {
          client: true,
          platform: true,
          task: true,
        },
      });

      return projects;
    } catch (error) {
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
}

export default ProjectService;
