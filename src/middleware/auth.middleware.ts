import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../error/unauthrized.error';
import { IUserRequest } from '../interfaces/auth.interfaces';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Token tidak ada');
    }

    const userToken = jwt.verify(token, process.env.JWT_KEY as string);

    if (!userToken) {
      throw new UnauthorizedError('Token tidak terverifikasi');
    }

    req.body.user = userToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default authToken;
