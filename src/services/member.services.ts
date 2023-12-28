import prisma from '../config/prisma-client.config';
import NotFoundError from '../error/not-found.error';
import { ICreateMemberRequestParams } from '../interfaces/member.interface';

class MemberService {
  static async createMember(payload: ICreateMemberRequestParams) {
    try {
      // const user = await prisma.user.create({
      //   data: {

      //   }
      // })

      const member = await prisma.member.create({
        data: {
          ...payload,
        },
      });

      return member;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMember() {
    try {
      const members = await prisma.member.findMany({
        include: {
          payroll: {
            include: {
              project: true,
            },
          },
          task: true,
        },
      });

      return members;
    } catch (error) {
      throw error;
    }
  }

  static async getMemberDetail(id: string) {
    try {
      const member = await prisma.member.findUnique({
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
        },
      });

      if (!member) {
        return member;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateMember(id: string, payload: ICreateMemberRequestParams) {
    try {
      const findMember = await prisma.member.findUnique({
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