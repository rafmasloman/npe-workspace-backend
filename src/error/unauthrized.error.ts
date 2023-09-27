import { HttpStatusCode } from '../constants/responses.constant';
import BaseError from './bad-request.error';

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super('Unauthorized', message, HttpStatusCode.UNAUTHORIZED);
  }
}

export default UnauthorizedError;
