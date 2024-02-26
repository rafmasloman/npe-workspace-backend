import prisma from '../../config/prisma-client.config';

class TaskOnMilestone {
  static async getTaskByMilestoneId(milestoneId: string) {
    try {
      const task = await prisma.task.findMany({
        where: {
          milestoneId: Number(milestoneId),
        },
        select: {
          name: true,
          status: true,
        },
      });

      return task;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskOnMilestone;
