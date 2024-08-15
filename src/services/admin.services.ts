import prisma from '../config/prisma-client.config';
import { HashPassword } from '../constants/auth.constant';
import NotFoundError from '../error/not-found.error';
import ValidationError from '../error/validation.error';
import {
  IAdminCreateUserRequestParams,
  IAdminUpdateUserRequestParams,
} from '../interfaces/admin.interfaces';
import { IUserDetailResponse } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import MailerLibs from '../libs/mailer.libs';

class AdminService {
  static async changePassword(
    id: string,
    payload: {
      userId: string;
      newPassword: string;
    },
  ) {
    const { newPassword, userId } = payload;

    try {
      const checkRole = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      console.log('check role : ', checkRole);

      // if ((!checkRole?.role as unknown) !== 'ADMIN') {
      //   throw NotFoundError;
      // }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async forgetPassword(payload: { email?: string; username?: string }) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: payload.email,
            },
            {
              username: payload.username,
            },
          ],
        },
        include: {
          member: {
            select: {
              phoneNumber: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundError('Username atau Email tidak ditemukan');
      }

      MailerLibs.sendForgotPasswordAccount(user.email);

      // const updateUserPassword = await prisma.user.updateMany({
      //   where: {
      //     OR: [{
      //       email: user.email
      //     }, {
      //       username: user.username
      //     }]
      //   },
      //   data: {
      //     password
      //   }
      // })
    } catch (error) {
      throw error;
    }
  }

  static async createUser(payload: IAdminCreateUserRequestParams) {
    try {
      const hashPassword = await bcrypt.hash(
        payload.password,
        HashPassword.SALT_ROUND,
      );

      const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        throw new ValidationError('Email Sudah ada');
      }

      const user = await prisma.user.create({
        data: {
          ...payload,
          password: hashPassword,
        } as IAdminCreateUserRequestParams,
      });

      return user;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  static async deleteUser(id: string) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  static async updateUser(id: string, payload: IAdminUpdateUserRequestParams) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateUserPassword(
    id: string,
    payload: IAdminUpdateUserRequestParams,
  ) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAllUser() {
    try {
      const user = await prisma.user.findMany({
        where: {
          OR: [
            {
              role: 'PROJECT_MANAGER',
            },

            {
              role: 'STAFF',
            },
          ],
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          role: true,
          member: {
            select: {
              id: true,
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserStaff() {
    try {
      const staff = await prisma.user.findMany({
        where: {
          OR: [
            {
              role: 'STAFF',
            },
            {
              role: 'PROJECT_MANAGER',
            },
          ],
        },
      });

      return staff;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async getUserDetail(id: string) {
    try {
      const user: IUserDetailResponse | any = await prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          role: true,

          member: {
            select: {
              id: true,
              profilePicture: true,
              position: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundError('Not Found');
      }

      return user;
    } catch (error) {
      console.log('user credential error : ', error);

      throw error;
    }
  }

  static async getUserMember() {
    try {
      const user = await prisma.user.findMany({
        where: {
          role: 'PROJECT_MANAGER' && 'STAFF',
          member: { isNot: null },
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserNonMember() {
    try {
      const user = await prisma.user.findMany({
        where: {
          OR: [
            {
              role: 'STAFF',
            },
            {
              role: 'PROJECT_MANAGER',
            },
          ],
          member: { is: null },
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectManagerWithNonProject() {
    try {
      const user = await prisma.user.findMany({
        where: {
          role: 'PROJECT_MANAGER',
          member: { isNot: null },
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          member: {
            select: {
              id: true,
              project: true,
            },
          },
        },
      });

      const projectManager = user.map((ctx) => {
        if (ctx.member?.project) {
          if (ctx.member.project.length <= 0) {
            return ctx;
          }
        }
      });

      return projectManager;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRoles() {
    try {
      const roles = await prisma.user.findMany({
        select: {
          role: true,
        },
      });

      return roles;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AdminService;
