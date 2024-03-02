import { NextFunction, Request, Response } from 'express';
import ProfileService from '../services/profile.services';
import { HttpStatusCode } from '../constants/responses.constant';

class ProfileController {
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const {
        firstname,
        lastname,
        phoneNumber,
        gender,
        birthDate,
        email,
        profilePicture,
      } = req.body;

      console.log(req.body);

      const userProfile = await ProfileService.updateProfile(userId, {
        firstname,
        lastname,
        phoneNumber,
        gender,
        birthDate,
        profilePicture,
        email,
      });

      return res.json({
        message: 'Berhasil update data profile',
        statusCode: HttpStatusCode.OK,
        data: userProfile,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async updateProfilePicture(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const profilePicture = req.file?.filename;
      const { userId } = req.params;

      const userProfile = await ProfileService.updateProfilePicture(userId, {
        profilePicture: profilePicture ?? '',
      });

      return res.json({
        message: 'Berhasil update data foto profile',
        statusCode: HttpStatusCode.OK,
        data: userProfile,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userProfile = await ProfileService.getProfileDetail(userId);

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil mendapatkan data profile',
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfilePicture(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.params;

      const userProfile = await ProfileService.getProfilePicture(userId);

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil mendapatkan data profile',
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
