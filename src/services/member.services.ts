import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import {
  ICreateMemberRequestParams,
  IUpdateMemberRequestParams,
} from '../interfaces/member.interface';

class MemberService {
  static async createMember(payload: ICreateMemberRequestParams) {
    try {
      const member = await prisma.member.create({
        data: {
          ...payload,
          userId: payload.userId,
        },
        include: {
          user: true,
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberProject(userId: string) {
    try {
      const member = await prisma.member.findFirst({
        where: {
          userId,
        },
        include: {
          project: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMember(
    firstname?: string,
    lastname?: string,
    position?: string,
    limit?: number,
  ) {
    try {
      const members = await prisma.member.findMany({
        include: {
          payroll: {
            include: {
              project: true,
            },
          },
          task: true,
          user: true,
        },

        where: {
          user: {
            AND: [
              {
                firstname: {
                  contains: firstname,
                },
              },
              {
                lastname: {
                  contains: lastname,
                },
              },
            ],
          },

          position: {
            contains: position,
          },
        },
        take: !limit ? undefined : limit,
      });

      return members;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberDetail(id: string) {
    try {
      const member = await prisma.member.findFirst({
        where: {
          id,
        },
        include: {
          payroll: {
            include: {
              project: true,
            },
          },
          task: true,
          project: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberProjectManager() {
    try {
      const staff = await prisma.member.findMany({
        where: {
          user: {
            role: 'PROJECT_MANAGER',
          },
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return staff;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberStaff() {
    try {
      const staff = await prisma.member.findMany({
        where: {
          user: {
            role: 'STAFF',
          },
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      return staff;
    } catch (error) {
      throw error;
    }
  }

  static async updateMember(id: string, payload: IUpdateMemberRequestParams) {
    try {
      const findMember = await prisma.member.findFirst({
        where: {
          id,
        },
      });

      if (!findMember) {
        throw new NotFoundError('Member not found');
      }

      const member = await prisma.member.update({
        where: {
          id,
        },
        data: {
          ...payload,
          userId: payload.userId,
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMember(id: string) {
    try {
      const findMember = await prisma.member.findUnique({
        where: {
          id,
        },
      });

      if (!findMember) {
        throw new NotFoundError('Member not found');
      }
      const member = await prisma.member.delete({
        where: {
          id,
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberService;
