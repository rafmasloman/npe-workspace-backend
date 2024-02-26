import { RoleType } from '@prisma/client';

export interface ICreateMemberRequestParams {
  name: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: Date;
  userId: string;
}

export interface IReadMembersResponseParams {
  id: string;
  name: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: Date;
}

export interface IMemberResponseParams {
  id: string;
  position: string;
  phoneNumber: string;
  profilePicture: string | null;
  gender: string;
  birthDate: Date;
  role: RoleType;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
