import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../error/unauthrized.error';

const checkRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.signedCookies;

    if (role.toLowerCase() !== 'admin'.toLowerCase()) {
      throw new UnauthorizedError(
        'Hanya Admin yang bisa mengakses endpoint ini',
      );
    }

    next();
  } catch (error) {
    console.log('error : ', error);

    next(error);
  }
};

export default checkRole;
