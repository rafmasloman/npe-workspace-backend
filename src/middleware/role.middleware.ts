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

const checkRolePM = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.signedCookies;

    console.log(
      'role : ',
      role.toLowerCase() !== 'admin'.toLowerCase() &&
        role.toLowerCase() !== 'project_manager'.toLowerCase(),
    );

    if (
      role.toLowerCase() !== 'admin'.toLowerCase() &&
      role.toLowerCase() !== 'project_manager'.toLowerCase()
    ) {
      throw new UnauthorizedError(
        'Hanya Admin atau Project Management yang dapat mengakses endpoint ini',
      );
    }

    next();
  } catch (error) {
    console.log('error : ', error);

    next(error);
  }
};

export { checkRole, checkRolePM };
