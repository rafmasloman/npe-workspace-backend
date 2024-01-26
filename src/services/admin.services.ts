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

class AdminService {
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

  static async getAllUser() {
    try {
      const user = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
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
      const user: IUserDetailResponse | any = await prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: true,
        },
      });

      console.log('user detail : ', user);

      if (!user) {
        throw new NotFoundError('Not Found');
      }

      return user;
    } catch (error) {
      console.log('user credential error : ', error);

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
