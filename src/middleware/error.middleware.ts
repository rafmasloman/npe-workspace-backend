// class ErroHandler extends Error {
//   statusCode: number;
//   name: string;
//   constructor(name: string, message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = name;
//   }
// }
// export default ErroHandler;

import { NextFunction, Request, Response } from 'express';
import BaseError from '../error/bad-request.error';

const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof BaseError ? err.statusCode : 500;
  const message =
    err instanceof BaseError ? err.message : 'Internal Server Error';

  return res.status(statusCode).json({
    name: err.name,
    message: message,
  });
};

export default ErrorHandler;
