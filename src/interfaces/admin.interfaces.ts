import { Prisma } from '@prisma/client';

export interface IAdminCreateUserRequestParams {
  email: string;
  username: string;
  password: string;
  fullname: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
  //   role: Prisma.RoleCreateNestedOneWithoutUsersInput;
}

export interface IAdminUpdateUserRequestParams {
  id: string;
  email: string;
  username: string;
  password: string;
  fullname: string;
  //   role: Prisma.RoleCreateNestedOneWithoutUsersInput;
}

export interface IRoleRequestParams {
  name: string;
}

export enum ERole {
  'ADMIN',
  'CLIENT',
  'STAFF',
  'PROJECT_MANAGEMENT',
}
