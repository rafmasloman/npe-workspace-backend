import prisma from '../../config/prisma-client.config';
import { IMemberResponseParams } from '../../interfaces/member.interface';
import { IInviteMemberParamsType } from '../../interfaces/project.interface';

class ProjectOnMember {
  static async inviteMemberToProject(payload: IInviteMemberParamsType) {
    try {
      const inviteMember = await prisma.project.update({
        where: {
          id: payload.projectId,
        },
        data: {
          member: {
            connect: {
              id: payload.member,
            },
          },
        },
      });

      return inviteMember;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMemberFromProject(id: string, memberId: string) {
    try {
      const project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          member: {
            disconnect: {
              id: memberId,
            },
          },
        },
        select: {
          projectName: true,
          member: true,
        },
      });

      return project;
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectOnMember;
