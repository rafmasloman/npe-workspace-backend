import { HttpStatusCode } from '../constants/responses.constant';
import BaseError from './bad-request.error';

class ValidationError extends BaseError {
  constructor(message: string) {
    super('Error', message, HttpStatusCode.NOT_FOUND);
  }
}

export default ValidationError;
