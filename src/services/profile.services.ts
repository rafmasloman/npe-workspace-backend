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
      const userDetail = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      const userProfileResponse = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          //   member: {
          //     connect: {
          //       id: memberId,
          //       phoneNumber: payload.phoneNumber,
          //     },
          //   },
        },
      });

      //   console.log('user profile : ', userProfileResponse);

      const memberProfileResponse = await prisma.member.update({
        where: {
          userId: userProfileResponse.id,
        },
        data: {
          phoneNumber: payload.phoneNumber,
          profilePicture: payload.profilePicture,
          gender: payload.gender,
          birthDate: payload.birthDate,
        },
      });

      const data = {
        ...userProfileResponse,
        ...memberProfileResponse,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;
