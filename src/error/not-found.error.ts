import { HttpStatusCode } from '../constants/responses.constant';
import BaseError from './bad-request.error';

class NotFoundError extends BaseError {
  constructor(message: string) {
    super('NOT_FOUND', message, HttpStatusCode.NOT_FOUND);
  }
}

export default NotFoundError;
