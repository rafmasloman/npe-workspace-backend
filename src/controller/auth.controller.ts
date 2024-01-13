import { NextFunction, Request, Response } from 'express';
import AuthServices from '../services/auth.services';
import { HttpStatusCode } from '../constants/responses.constant';
import AdminService from '../services/admin.services';

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await AuthServices.login({ email, password });

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil Login',
        data: {
          token: user,
        },
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  },

  credential: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCredential = req.body.user;

      console.log('user credential : ', req.body.user.id);

      const user = await AdminService.getUserDetail(userCredential.id);

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil menampilkan user credential',
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default authController;
