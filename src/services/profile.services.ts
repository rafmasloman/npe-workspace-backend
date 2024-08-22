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
      throw error;
    }
  }

  static async getProfilePicture(userId: string) {
    try {
      const userProfilePictureResponse = await prisma.member.findFirst({
        where: {
          user: {
            id: userId,
          },
        },
        select: {
          profilePicture: true,
        },
      });

      return userProfilePictureResponse;
    } catch (error) {
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

          member: {
            update: {
              phoneNumber: payload.phoneNumber,
              // gender: payload.gender,
              birthDate: payload.birthDate,
            },
          },
        },
      });

      return userProfileResponse;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfilePicture(
    userId: string,
    payload: { profilePicture: string },
  ) {
    try {
      const userProfilePicture = await prisma.member.update({
        where: {
          userId,
        },
        data: {
          profilePicture: payload.profilePicture,
        },
        select: {
          profilePicture: true,
        },
      });

      return userProfilePicture;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;
