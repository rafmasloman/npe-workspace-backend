import { Prisma } from '@prisma/client';

export interface IAdminCreateUserRequestParams {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
  //   role: Prisma.RoleCreateNestedOneWithoutUsersInput;
}

export interface IAdminUpdateUserRequestParams {
  email?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
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
