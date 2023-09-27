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
// import { configDotenv } from 'dotenv';

// configDotenv();
class AuthServices {
  static async register(roleName: string, payload: IUserRegisterParams) {
    try {
      const hashPassword = await bcrypt.hash(
        payload.password,
        HashPassword.SALT_ROUND,
      );

      const user = prisma.user.create({
        data: {
          ...payload,
          password: hashPassword,
          role: {
            connect: {
              name: roleName as RoleType,
            },
          },
        },
      });

      return user;
    } catch (error) {
      return error;
    }
  }

  static async login(payload: IUserLoginRequestParams) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      const role = await prisma.role.findUnique({
        where: {
          id: user?.roleId,
        },
      });

      if (user) {
        const comparePassword = await bcrypt.compare(
          payload.password,
          user.password,
        );

        if (comparePassword) {
          const token = jwt.sign(
            { userId: user.id, role: role?.name },
            process.env.JWT_KEY as string,
          );

          return token;
        }

        throw new UnauthorizedError('Email atau Password salah');
      }

      throw new UnauthorizedError('Email atau Password salah');
    } catch (error) {
      throw error;
    }
  }
}

export default AuthServices;
