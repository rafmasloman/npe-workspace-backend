import prisma from '../../config/prisma-client.config';

type TaskMemberTypes = {
  member: {
    id: string;
  }[];
} | null;

class TaskMemberService {
  static async removeMemberFromTask(id: number, findMember: TaskMemberTypes) {
    try {
      const removeMemberTask = await prisma.task.update({
        where: {
          id,
        },
        data: {
          member: {
            disconnect: findMember?.member.map((member: any) => ({
              id: member.id,
            })),
          },
        },
      });

      return removeMemberTask;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskMemberService;
