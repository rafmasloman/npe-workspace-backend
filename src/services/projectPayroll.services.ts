import prisma from '../config/prisma-client.config';

class ProjectOnPayrollService {
  static async updateProjectOnPayroll(
    id: string,
    payload: { currentPayroll: number },
  ) {
    try {
      const projectOnPayroll = await prisma.project.update({
        where: {
          id,
        },
        data: {
          currentPayroll: payload.currentPayroll,
        },
      });

      return projectOnPayroll;
    } catch (error) {
      throw error;
    }
  }

}

export default ProjectOnPayrollService;
