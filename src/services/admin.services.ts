import prisma from '../config/prisma-client.config';
import { HashPassword } from '../constants/auth.constant';
import NotFoundError from '../error/not-found.error';
import {
  IAdminCreateUserRequestParams,
  IAdminUpdateUserRequestParams,
} from '../interfaces/admin.interfaces';
import { IUserDetailResponse } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

class AdminService {
  static async createUser(
    roleID: number,
    payload: IAdminCreateUserRequestParams,
  ) {
    try {
      const userRole = await prisma.role.findUnique({
        where: {
          id: roleID,
        },
      });

      const hashPassword = await bcrypt.hash(
        payload.password,
        HashPassword.SALT_ROUND,
      );

      const user = await prisma.user.create({
        data: {
          ...payload,
          password: hashPassword,
          roleId: userRole?.id,
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
        data: payload,
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
        include: {
          role: true,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserDetail(id: string) {
    try {
      const user: IUserDetailResponse | null = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundError('Not Found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRoles() {
    try {
      const roles = await prisma.role.findMany();

      return roles;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AdminService;
