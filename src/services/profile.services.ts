import prisma from '../config/prisma-client.config';
import { IUpdateProfileRequestParams } from '../interfaces/profile.interfaces';

class ProfileService {
  static async getProfileDetail(userId: string) {
    try {
      const userProfileResponse = await prisma.member.findFirst({
        where: {
          user: {
            id: userId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });

      return userProfileResponse;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  static async updateProfile(
    userId: string,
    payload: IUpdateProfileRequestParams,
  ) {
    try {
      const userProfileResponse = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email,
          member: {
            update: {
              phoneNumber: payload.phoneNumber,
              gender: payload.gender,
            },
          },
        },
      });

      return userProfileResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;