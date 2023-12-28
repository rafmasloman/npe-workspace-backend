import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserRegisterParams {
  email: string;
  password: string;
  fullname: string;
  username: string;
  role: Prisma.RoleCreateNestedOneWithoutUsersInput;
}

export interface IUserLoginRequestParams {
  email: string;
  password: string;
}



export interface IUserRequest extends Request {
  user: string | JwtPayload;
}
