class BaseError extends Error {
  statusCode: number;
  name: string;
  constructor(name: string, message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}
export default BaseError;
