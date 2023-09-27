import { NextFunction, Request, Response } from 'express';
import AuthServices from '../services/auth.services';
import { HttpStatusCode } from '../constants/responses.constant';

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await AuthServices.login({ email, password });

      return res.json({
        statusCode: HttpStatusCode.OK,
        message: 'Berhasil Login',
        token: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
