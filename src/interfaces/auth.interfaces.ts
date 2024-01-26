import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserRegisterParams {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  role: 'ADMIN' | 'STAFF' | 'PROJECT_MANAGER';
}

export interface IUserLoginRequestParams {
  email: string;
  password: string;
}

export interface IUserRequest extends Request {
  user: string | JwtPayload;
}
