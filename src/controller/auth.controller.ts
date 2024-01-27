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
      const userCredential = req.signedCookies;
      console.log('user credential : ', req.signedCookies);

      const user = await AdminService.getUserDetail(userCredential.id);

      console.log(user);

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil menampilkan user credential',
        user: {
          ...user,
          fullname: user.firstname + ' ' + user.lastname,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;

      const user = await AuthServices.register(payload);

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Registrasi Berhasil',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
