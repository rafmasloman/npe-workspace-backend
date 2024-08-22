import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../error/unauthrized.error';

const checkRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.signedCookies;

    if (role.toLowerCase() !== 'admin'.toLowerCase()) {
      throw new UnauthorizedError('Hanya Admin yang bisa mengakses fitur ini');
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkRolePM = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.signedCookies;

    if (
      role.toLowerCase() !== 'admin'.toLowerCase() &&
      role.toLowerCase() !== 'project_manager'.toLowerCase()
    ) {
      throw new UnauthorizedError(
        'Hanya Admin atau Project Management yang dapat mengakses fitur ini',
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { checkRole, checkRolePM };
