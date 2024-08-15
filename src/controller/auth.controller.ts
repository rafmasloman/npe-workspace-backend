import { NextFunction, Request, Response } from 'express';
import AuthServices from '../services/auth.services';
import { HttpStatusCode } from '../constants/responses.constant';
import AdminService from '../services/admin.services';
import bcrypt, { hash } from 'bcrypt';

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

  changeUserPassword: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { newPassword } = req.body;
      const params = req.params;
      const user = await AuthServices.changeUserPassword(params.id, {
        newPassword,
      });

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil Mengubah Password User',
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

      const user = await AdminService.getUserDetail(userCredential.id);

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

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const { id, role } = req.signedCookies;
      const user = await AuthServices.getUserPassword(id);

      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const userUpdate = await AdminService.updateUser(id, {
        password: hashedPassword,
        role,
      });

      res.json({
        message: 'berhasil mengubah password',
        data: userUpdate,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default authController;
