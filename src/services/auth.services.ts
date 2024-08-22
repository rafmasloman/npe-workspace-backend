import { RoleType } from '@prisma/client';
import prisma from '../config/prisma-client.config';
import {
  IUserLoginRequestParams,
  IUserRegisterParams,
} from '../interfaces/auth.interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../error/unauthrized.error';
import { HashPassword } from '../constants/auth.constant';
import NotFoundError from '../error/not-found.error';
// import { configDotenv } from 'dotenv';

// configDotenv();
class AuthServices {
  static async register(payload: IUserRegisterParams) {
    try {
      const hashPassword = await bcrypt.hash(
        payload.password,
        HashPassword.SALT_ROUND,
      );

      const user = prisma.user.create({
        data: {
          ...payload,
          password: hashPassword,
        },
      });

      return user;
    } catch (error) {
      return error;
    }
  }

  static async login(payload: IUserLoginRequestParams) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
          role: true,
          password: true,
        },
      });

      if (!user) {
        throw new UnauthorizedError('Email atau Password salah');
      }

      const comparePassword = await bcrypt.compare(
        payload.password,
        user.password as any,
      );

      if (!comparePassword) {
        throw new UnauthorizedError('Email atau Password salah');
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_KEY as string,
      );

      return token;
    } catch (error) {
      throw error;
    }
  }

  static async changeUserPassword(
    id: string,
    payload: { newPassword: string },
  ) {
    try {
      // const findUserPassword = await this.getUserPassword(id)

      // if(!findUserPassword) {
      //   throw new NotFoundError("Tidak dapat menemukan password")
      // }

      const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateUserAccount(
    id: string,
    payload: { email: string; newPassword: string },
  ) {
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!findUser) {
        throw new NotFoundError('Tidak dapat menemukan password');
      }

      const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          email: payload.email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getCredential(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserPassword(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          password: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthServices;
